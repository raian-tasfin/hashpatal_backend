/*
   Approach:   There may be different types of schedulable entities, for example:
   doctors, test machines etc. We call these schedulables. Each
   schedulable is identified by a unique pair (entity_id, schedulable_type).
   We schedule for 15 min (or some number) time blocks. These are related to appointments.
   The slot list are generated from routines.
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  KyselyDatabaseService,
  RoleType,
  SchedulableType,
  WeekDayType,
} from '@org/shared/db';
import { DoctorService } from 'src/doctor/doctor.service';
import { UserService } from 'src/user';
import { RoutineSyncInput, ScheduleSyncInput } from './input';
import { addDays, isAfter, parseISO, startOfToday, format } from 'date-fns';

@Injectable()
export class ScheduleService {
  private readonly _logger = new Logger(ScheduleService.name);

  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(DoctorService) private readonly doctorService: DoctorService,
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
  ) {}

  /**
   * Public Mutations
   */
  async schedule_sync({
    entityUuid,
    schedulable,
    minutes_per_slot,
    max_booking_days,
  }: ScheduleSyncInput) {
    const entity_id = await this._get_entity_id(
      entityUuid,
      schedulable as SchedulableType,
    );
    if (!entity_id) return false;
    const newSchedule = await this._db
      .insertInto('schedule')
      .values({
        entity_id,
        type: schedulable as SchedulableType,
        minutes_per_slot,
        max_booking_days,
      })
      .onConflict((oc) =>
        oc.columns(['entity_id', 'type']).doUpdateSet({
          minutes_per_slot,
          max_booking_days,
        }),
      )
      .returning('id')
      .executeTakeFirst();
    if (!newSchedule) return false;
    if (schedulable === SchedulableType.DOCTOR) {
      await this._db
        .updateTable('doctor_profile')
        .set({ scheduleId: newSchedule.id })
        .where('id', '=', entity_id)
        .execute();
    }
    return true;
  }

  async routine_sync({
    entityUuid,
    schedulable,
    slots,
  }: RoutineSyncInput): Promise<boolean> {
    const schedule_id = await this._get_schedule_id(
      entityUuid,
      schedulable as SchedulableType,
    );
    if (!schedule_id) return false;
    return await this._db.transaction().execute(async (trx) => {
      await trx
        .deleteFrom('routine')
        .where('schedule_id', '=', schedule_id)
        .execute();
      if (slots.length > 0) {
        await trx
          .insertInto('routine')
          .values(
            slots.map((slot) => ({
              schedule_id,
              week_day: slot.weekDay,
              shift: slot.shift,
              start_time: slot.startTime,
              end_time: slot.endTime,
            })),
          )
          .execute();
      }
      return true;
    });
  }

  /**
   * Public Queries
   */
  async get_schedule_from_id(scheduleId: number) {
    return await this._db
      .selectFrom('schedule')
      .selectAll()
      .where('id', '=', scheduleId)
      .executeTakeFirst();
  }

  /**
   * Private Uitilities
   */
  async _get_entity_id(entityUuid: string, schedulable: SchedulableType) {
    if (schedulable === SchedulableType.DOCTOR) {
      const res = await this._db
        .selectFrom('user_account')
        .innerJoin('user_role', 'user_role.user_id', 'user_account.id')
        .innerJoin(
          'doctor_profile',
          'doctor_profile.user_id',
          'user_account.id',
        )
        .select('doctor_profile.id as doctor_id')
        .where('user_account.uuid', '=', entityUuid)
        .where('user_role.role', '=', RoleType.DOCTOR)
        .executeTakeFirst();
      if (!res) return null;
      return res.doctor_id;
    }
    return null;
  }

  async _get_schedule_id(entityUuid: string, schedulable: SchedulableType) {
    const res = await this._get_schedule(entityUuid, schedulable);
    if (!res) return null;
    return res.id;
  }

  async _get_schedule(entityUuid: string, schedulable: SchedulableType) {
    const entity_id = await this._get_entity_id(entityUuid, schedulable);
    if (!entity_id) return null;
    const res = await this._db
      .selectFrom('schedule')
      .select('id')
      .where('entity_id', '=', entity_id)
      .executeTakeFirst();
    if (!res) return null;
    return res;
  }

  private _timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private _minutesToTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0');
    const minutes = (totalMinutes % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }
}
