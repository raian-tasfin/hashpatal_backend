import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Appointment,
  AvailableSlots,
  BlockedDays,
  KyselyDatabaseService,
  OverrideRoutine,
  RegularRoutine,
  RoleType,
  SchedulableType,
  Schedule,
  WeekDayType,
} from '@org/shared/db';
import { ISlot } from '@org/shared/slots';
import { DoctorService } from 'src/doctor/doctor.service';
import { UserService } from 'src/user';
import {
  DoctorBlockedDaysAddInput,
  DoctorBlockedDaysRemoveInput,
  DoctorOverrideRoutineSyncInput,
  DoctorRegularRoutineSyncInput,
  DoctorScheduleSyncInput,
} from './input';
import { format_date } from '@org/shared/fields';
import { sql } from 'kysely';
import { addDays, eachDayOfInterval, startOfToday } from 'date-fns';
import { DB } from '@org/shared/db/types';

const SlotCollectionKey = {
  regular_routine: 'weekDay',
  override_routine: 'date',
  available_slots: 'date',
  appointment: 'date',
} as const;
type SlotCollection = keyof typeof SlotCollectionKey;
type WeekIndexedSlotCollection = {
  [K in SlotCollection]: (typeof SlotCollectionKey)[K] extends 'weekDay'
    ? K
    : never;
}[SlotCollection];
type DateIndexedSlotCollection = Exclude<
  SlotCollection,
  WeekIndexedSlotCollection
>;
type HasDateScheduleId = DateIndexedSlotCollection | 'blocked_days';

@Injectable()
export class ScheduleService {
  private readonly _logger = new Logger(ScheduleService.name);

  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(DoctorService) private readonly doctorService: DoctorService,
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
  ) {}

  /**
   * Mutations
   */
  async doctor_schedule_sync(data: DoctorScheduleSyncInput): Promise<boolean> {
    const { email, minutesPerSlot, maxBookingDays } = data;
    const user = await this.userService.find_by_email({ email });
    if (!user) throw new NotFoundException(`User "${email}" not found`);
    const roles = await this.userService._find_roles(user.id);
    if (!roles.includes(RoleType.DOCTOR)) {
      throw new UnauthorizedException(`"${email}" not DOCTOR.`);
    }
    const doctor = await this.doctorService.get_profile(user.id);
    if (!doctor) {
      throw new NotFoundException(`Doctor "${email}"'s profile not found`);
    }
    await this._db.transaction().execute(async (trx) => {
      if (doctor.scheduleId) {
        await trx
          .deleteFrom('schedule')
          .where('id', '=', doctor.scheduleId)
          .execute();
      }
      const { id } = await trx
        .insertInto('schedule')
        .values({
          entityId: doctor.id,
          minutesPerSlot,
          maxBookingDays,
          type: SchedulableType.DOCTOR,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await trx
        .updateTable('doctor_profile')
        .set({ scheduleId: id })
        .where('id', '=', doctor.id)
        .execute();
    });
    return true;
  }

  async doctor_regular_routine_sync(data: DoctorRegularRoutineSyncInput) {
    const { email, slots } = data;
    const schedule = await this._get_doctor_schedule_or_throw(email);
    return this._sync_slots('regular_routine', schedule, slots);
  }

  async doctor_override_routine_sync(data: DoctorOverrideRoutineSyncInput) {
    const { email, slots } = data;
    const schedule = await this._get_doctor_schedule_or_throw(email);
    return this._sync_slots('override_routine', schedule, slots);
  }

  async doctor_blocked_days_add(
    data: DoctorBlockedDaysAddInput,
  ): Promise<boolean> {
    const { email, dates } = data;
    const { id: schedulableId } =
      await this._get_doctor_schedule_or_throw(email);
    return this._blocked_days_add(schedulableId, dates);
  }

  async doctor_blocked_days_remove(
    data: DoctorBlockedDaysRemoveInput,
  ): Promise<boolean> {
    const { email, dates } = data;
    const { id: schedulableId } =
      await this._get_doctor_schedule_or_throw(email);
    return this._blocked_days_remove(schedulableId, dates);
  }

  /**
   * Queries
   */
  async get_doctor_schedule(
    doctorProfileId: number,
  ): Promise<Schedule | undefined> {
    return await this._db
      .selectFrom('schedule')
      .selectAll()
      .where('entityId', '=', doctorProfileId)
      .where('type', '=', SchedulableType.DOCTOR)
      .executeTakeFirst();
  }

  async get_regular_slots(scheduleId: number): Promise<RegularRoutine[]> {
    return await this._db
      .selectFrom('regular_routine')
      .selectAll()
      .where('scheduleId', '=', scheduleId)
      .execute();
  }

  async get_override_slots(scheduleId: number): Promise<OverrideRoutine[]> {
    return await this._db
      .selectFrom('override_routine')
      .selectAll()
      .where('scheduleId', '=', scheduleId)
      .execute();
  }

  async get_blocked_days(scheduleId: number): Promise<BlockedDays[]> {
    return await this._db
      .selectFrom('blocked_days')
      .selectAll()
      .where('scheduleId', '=', scheduleId)
      .execute();
  }

  async get_available_show_slots(
    scheduleId: number,
  ): Promise<OverrideRoutine[]> {
    const { maxBookingDays } = await this._db
      .selectFrom('schedule')
      .select('maxBookingDays')
      .where('id', '=', scheduleId)
      .executeTakeFirstOrThrow();
    const start = startOfToday();
    const end = addDays(start, maxBookingDays - 1);
    const dates = eachDayOfInterval({ start, end }).map(format_date);
    const nestedResults = await Promise.all(
      dates.map((date) =>
        this._get_available_show_slots_date(date, scheduleId),
      ),
    );
    return nestedResults.flat();
  }

  /**
   * Private utilities
   */
  private _hhmm_to_minutes(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }

  private _minutes_to_hhmm(m: number): string {
    const hh = Math.floor(m / 60)
      .toString()
      .padStart(2, '0');
    const mm = (m % 60).toString().padStart(2, '0');
    return `${hh}:${mm}`;
  }

  private _to_date_week(
    inStr: string,
    to: 'weekDay' | 'date',
  ): string | WeekDayType {
    if (to === 'weekDay') {
      if (Object.values(WeekDayType).includes(inStr as WeekDayType)) {
        return inStr as WeekDayType;
      }
      const [year, month, day] = inStr.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      return new Intl.DateTimeFormat('en-US', { weekday: 'long' })
        .format(dateObj)
        .toUpperCase() as WeekDayType;
    }
    return inStr;
  }

  private async _get_doctor_schedule_or_throw(
    email: string,
  ): Promise<Schedule> {
    const user = await this.userService.find_by_email({ email });
    if (!user) throw new NotFoundException(`User ${email} not found.`);
    const doctor = await this.doctorService.get_profile(user.id);
    if (!doctor) throw new NotFoundException(`No doctor profile for ${email}`);
    const schedule = await this.get_doctor_schedule(doctor.id);
    if (!schedule) {
      throw new NotFoundException(`No doctor schedule for ${email}`);
    }
    return schedule;
  }

  private async _sync_slots<T extends ISlot>(
    table: 'regular_routine' | 'override_routine',
    schedule: Schedule,
    slots: T[],
  ): Promise<boolean> {
    const { id: scheduleId } = schedule;
    await this._db.transaction().execute(async (trx) => {
      await trx
        .deleteFrom(table)
        .where('scheduleId', '=', scheduleId)
        .execute();
      await trx
        .insertInto(table)
        .values(
          slots.map((slot) => ({
            ...slot,
            scheduleId,
          })),
        )
        .execute();
    });
    return true;
  }

  private async _blocked_days_add(
    scheduleId: number,
    dates: string[],
  ): Promise<boolean> {
    await this._db
      .insertInto('blocked_days')
      .values(dates.map((date) => ({ date, scheduleId })))
      .onConflict((x) => x.doNothing())
      .execute();
    return true;
  }

  private async _blocked_days_remove(
    scheduleId: number,
    dates: string[],
  ): Promise<boolean> {
    if (dates.length === 0) return true;
    await this._db
      .deleteFrom('blocked_days')
      .where('scheduleId', '=', scheduleId)
      .where(
        'date',
        'in',
        dates.map((d) => new Date(d)),
      )
      .execute();
    return true;
  }

  private async _date_has_record(
    table: HasDateScheduleId,
    date: string,
    scheduleId: number,
  ): Promise<boolean> {
    const res = await this._db
      .selectFrom(table)
      .select(sql`1`.as('ok'))
      .where('date', '=', date as any)
      .where('scheduleId', '=', scheduleId)
      .limit(1)
      .executeTakeFirst();
    return res !== undefined && res !== null;
  }

  private async _copy_slots(
    src: SlotCollection,
    dest: SlotCollection,
    indexValue: string,
    scheduleId: number,
  ) {
    const srcKey = SlotCollectionKey[src];
    const destKey = SlotCollectionKey[dest];
    const lookupValue = this._to_date_week(indexValue, srcKey);
    const storageValue = this._to_date_week(indexValue, destKey);
    await this._db
      .insertInto(dest as any)
      .columns([destKey as any, 'shift', 'startTime', 'endTime', 'scheduleId'])
      .expression((eb) =>
        eb
          .selectFrom(src as any)
          .select([
            eb.val(storageValue).as(destKey),
            'shift',
            'startTime',
            'endTime',
            'scheduleId',
          ])
          .where('scheduleId', '=', scheduleId)
          .where(srcKey as any, '=', lookupValue as any),
      )
      .execute();
  }

  private async _ensure_override_routine(date: string, scheduleId: number) {
    if (await this._date_has_record('override_routine', date, scheduleId))
      return;
    await this._copy_slots(
      'regular_routine',
      'override_routine',
      date,
      scheduleId,
    );
  }

  private async _ensure_available_list(date: string, scheduleId: number) {
    if (await this._date_has_record('blocked_days', date, scheduleId)) return;
    if (await this._date_has_record('available_slots', date, scheduleId))
      return;
    await this._ensure_override_routine(date, scheduleId);
    await this._copy_slots(
      'override_routine',
      'available_slots',
      date,
      scheduleId,
    );
  }

  private async _get_available_show_slots_date(
    date: string,
    scheduleId: number,
  ): Promise<OverrideRoutine[]> {
    await this._ensure_available_list(date, scheduleId);
    const shiftRows = await this._db
      .selectFrom('available_slots')
      .select('shift')
      .distinct()
      .where('date', '=', date as any)
      .where('scheduleId', '=', scheduleId)
      .execute();
    const shiftValues = shiftRows.map((row) => row.shift);
    if (shiftValues.length === 0) return [];
    const showSlots = await this._db
      .selectFrom('override_routine')
      .selectAll()
      .where('date', '=', date as any)
      .where('scheduleId', '=', scheduleId)
      .where('shift', 'in', shiftValues)
      .execute();
    return showSlots;
  }
}
