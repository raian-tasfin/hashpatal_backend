import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  DoctorOverrideRoutineSyncInput,
  DoctorScheduleSyncInput,
} from './input';
import { UserService } from 'src/user';
import { DoctorService } from 'src/doctor/doctor.service';
import {
  KyselyDatabaseService,
  OverrideRoutine,
  RegularRoutine,
  RoleType,
  Schedulable,
  SchedulableType,
} from '@org/shared/db';
import { DoctorRegularRoutineSyncInput } from './input/doctor-regular-routine-sync.input';
import { ISlot } from '@org/shared/slots';

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
    const { email, minutesPerSlot } = data;
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
      if (doctor.schedulableId) {
        await trx
          .deleteFrom('schedulable')
          .where('id', '=', doctor.schedulableId)
          .execute();
      }
      const { id } = await trx
        .insertInto('schedulable')
        .values({
          entityId: doctor.id,
          minutesPerSlot: minutesPerSlot,
          type: SchedulableType.DOCTOR,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await trx
        .updateTable('doctor_profile')
        .set({ schedulableId: id })
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

  /**
   * Queries
   */
  async get_doctor_schedule(
    doctorProfileId: number,
  ): Promise<Schedulable | undefined> {
    return await this._db
      .selectFrom('schedulable')
      .selectAll()
      .where('entityId', '=', doctorProfileId)
      .where('type', '=', SchedulableType.DOCTOR)
      .executeTakeFirst();
  }

  async get_doctor_regular_slots(
    scheduleId: number,
  ): Promise<RegularRoutine[]> {
    return await this._db
      .selectFrom('regular_routine')
      .selectAll()
      .where('schedulableId', '=', scheduleId)
      .execute();
  }

  async get_doctor_override_slots(
    scheduleId: number,
  ): Promise<OverrideRoutine[]> {
    return await this._db
      .selectFrom('override_routine')
      .selectAll()
      .where('schedulableId', '=', scheduleId)
      .execute();
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

  private _explode_slots<T extends ISlot>(
    data: T[],
    minutesPerSlot: number,
  ): T[] {
    const exploded: T[] = [];
    for (const range of data) {
      let current = this._hhmm_to_minutes(range.startTime);
      const end = this._hhmm_to_minutes(range.endTime);
      while (current + minutesPerSlot <= end) {
        exploded.push({
          ...range,
          startTime: this._minutes_to_hhmm(current),
          endTime: this._minutes_to_hhmm(current + minutesPerSlot),
        });
        current += minutesPerSlot;
      }
    }
    return exploded;
  }

  private async _get_doctor_schedule_or_throw(
    email: string,
  ): Promise<Schedulable> {
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
    schedule: Schedulable,
    slots: T[],
  ): Promise<boolean> {
    const { id: schedulableId, minutesPerSlot } = schedule;
    const exSlots = this._explode_slots(slots, minutesPerSlot);
    await this._db.transaction().execute(async (trx) => {
      await trx
        .deleteFrom(table)
        .where('schedulableId', '=', schedulableId)
        .execute();
      await trx
        .insertInto(table)
        .values(
          exSlots.map((slot) => ({
            ...slot,
            schedulableId,
          })),
        )
        .execute();
    });
    return true;
  }
}
