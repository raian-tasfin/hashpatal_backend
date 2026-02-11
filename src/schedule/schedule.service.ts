import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DoctorScheduleSyncInput } from './input';
import { UserService } from 'src/user';
import { DoctorService } from 'src/doctor/doctor.service';
import {
  KyselyDatabaseService,
  RoleType,
  Schedulable,
  SchedulableType,
  WeekDayType,
} from '@org/shared/db';
import { DoctorRegularRoutineSyncInput } from './input/doctor-regular-routine-sync.input';
import { RegularRoutineSlotInput } from '@org/shared/fields';

@Injectable()
export class ScheduleSercvice {
  private readonly _logger = new Logger(ScheduleSercvice.name);

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
    const user = await this.userService.find_by_email({ email });
    if (!user) throw new NotFoundException(`User ${email} not found.`);
    const doctor = await this.doctorService.get_profile(user.id);
    if (!doctor) throw new NotFoundException(`No doctor profile for ${email}`);
    const schedule = await this.get_doctor_schedule(doctor.id);
    if (!schedule) {
      throw new NotFoundException(`No doctor schedule for ${email}`);
    }
    const { id: schedulableId, minutesPerSlot } = schedule;
    const exSlots = this._explode_slots(slots, minutesPerSlot);
    await this._db.transaction().execute(async (trx) => {
      await trx
        .deleteFrom('regular_routine')
        .where('schedulableId', '=', schedulableId)
        .execute();
      await trx
        .insertInto('regular_routine')
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

  private _explode_slots(
    data: RegularRoutineSlotInput[],
    minutesPerSlot: number,
  ): RegularRoutineSlotInput[] {
    const exploded = [];
    for (const range of data) {
      let current = this._hhmm_to_minutes(range.startTime);
      const end = this._hhmm_to_minutes(range.endTime);
      while (current + minutesPerSlot <= end) {
        exploded.push({
          weekDay: range.weekDay,
          startTime: this._minutes_to_hhmm(current),
          endTime: this._minutes_to_hhmm(current + minutesPerSlot),
        });
        current += minutesPerSlot;
      }
    }
    return exploded;
  }
}
