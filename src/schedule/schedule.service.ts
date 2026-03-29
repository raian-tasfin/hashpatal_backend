/*
   Approach:   There may be different types of schedulable entities, for example:
   doctors, test machines etc. We call these schedulables. Each
   schedulable is identified by a unique pair (entity_id, schedulable_type).
   We schedule for 15 min (or some number) time blocks. These are related to appointments.
   The slot list are generated from routines.
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AppointmentStatusType,
  KyselyDatabaseService,
  RoleType,
  SchedulableType,
  ShiftType,
  WeekDayType,
} from '@org/shared/db';
import { DoctorService } from 'src/doctor/doctor.service';
import { UserService } from 'src/user';
import {
  GetAppointmentsInput,
  RoutineSyncInput,
  ScheduleSyncInput,
} from './input';
import { addDays, isAfter, parseISO, startOfToday, format } from 'date-fns';
import { MakeAppointmentInput } from './input/make-appointment.input';

@Injectable()
export class ScheduleService {
  private readonly _logger = new Logger(ScheduleService.name);

  constructor(
    @Inject(UserService) private readonly _userService: UserService,
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

  async make_appointment({
    scheduleUuid,
    patientUuid,
    date,
    shift,
  }: MakeAppointmentInput) {
    // get schedule
    const schedule = await this.get_schedule_from_uuid(scheduleUuid);
    if (!schedule) {
      this._logger.error(`Schedule "${scheduleUuid}" not found.`);
      return false;
    }
    // get patient
    const user = await this._userService.find({ uuid: patientUuid });
    if (!user) {
      this._logger.error(`Patient "${patientUuid}" not found.`);
      return false;
    }
    return await this._db.transaction().execute(async (trx) => {
      // validate date is within booking window
      const targetDate = parseISO(date);
      const maxDate = addDays(startOfToday(), schedule.max_booking_days);
      if (isAfter(targetDate, maxDate)) {
        this._logger.error(`Date "${date}" exceeds max booking window.`);
        return false;
      }
      const weekDay = format(targetDate, 'EEEE').toUpperCase() as WeekDayType;
      // get routine for this shift and weekday
      const routine = await trx
        .selectFrom('routine')
        .selectAll()
        .where('schedule_id', '=', schedule.id)
        .where('week_day', '=', weekDay)
        .where('shift', '=', shift as ShiftType)
        .executeTakeFirst();
      if (!routine) {
        this._logger.error(`No routine for shift "${shift}" on "${weekDay}".`);
        return false;
      }
      // find taken slots
      const takenSlots = await trx
        .selectFrom('appointment')
        .select('start_time')
        .where('schedule_id', '=', schedule.id)
        .where('date', '=', date as any)
        .where('shift', '=', shift as ShiftType)
        .where('status', '=', AppointmentStatusType.SCHEDULED)
        .execute();
      const takenSet = new Set(takenSlots.map((s) => s.start_time));
      // find first free slot
      let current = this._timeToMinutes(routine.start_time);
      const end = this._timeToMinutes(routine.end_time);
      let assignedStart: string | null = null;
      while (current + schedule.minutes_per_slot <= end) {
        const startTime = this._minutesToTime(current);
        if (!takenSet.has(startTime)) {
          assignedStart = startTime;
          break;
        }
        current += schedule.minutes_per_slot;
      }
      if (!assignedStart) {
        this._logger.error(
          `No available slots for shift "${shift}" on "${date}".`,
        );
        return false;
      }
      const startTime = assignedStart;
      const endTime = this._minutesToTime(
        this._timeToMinutes(assignedStart) + schedule.minutes_per_slot,
      );
      await trx
        .insertInto('appointment')
        .values({
          schedule_id: schedule.id,
          patient_id: user.id,
          date: date as any,
          shift: shift as ShiftType,
          start_time: startTime,
          end_time: endTime,
          status: AppointmentStatusType.SCHEDULED,
        })
        .execute();
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

  async get_schedule_from_uuid(uuid: string) {
    return await this._db
      .selectFrom('schedule')
      .selectAll()
      .where('uuid', '=', uuid)
      .executeTakeFirst();
  }

  async get_available_slots(scheduleId: number, date: string) {
    // fetch schedule
    const schedule = await this._db
      .selectFrom('schedule')
      .selectAll()
      .where('id', '=', scheduleId)
      .executeTakeFirst();
    if (!schedule) return [];

    // check if withing max date
    const targetDate = parseISO(date);
    const maxDate = addDays(startOfToday(), schedule.max_booking_days);
    if (isAfter(targetDate, maxDate)) return [];

    // fetch routine using weekday
    const weekDay = format(parseISO(date), 'EEEE').toUpperCase() as WeekDayType;
    const routines = await this._db
      .selectFrom('routine')
      .selectAll()
      .where('schedule_id', '=', scheduleId)
      .where('week_day', '=', weekDay)
      .execute();
    if (routines.length === 0) return [];

    // calculate taken slots from appointment table
    const takenSlots = await this._db
      .selectFrom('appointment')
      .select('start_time')
      .where('schedule_id', '=', scheduleId)
      .where('date', '=', date as any)
      .where('status', '=', 'SCHEDULED')
      .execute();
    const takenSet = new Set(takenSlots.map((s) => s.start_time));

    // calculate available slots.
    const availableSlots: {
      shift: string;
      startTime: string;
      endTime: string;
    }[] = [];
    for (const routine of routines) {
      let current = this._timeToMinutes(routine.start_time);
      const end = this._timeToMinutes(routine.end_time);
      while (current + schedule.minutes_per_slot <= end) {
        const startTime = this._minutesToTime(current);
        if (!takenSet.has(startTime)) {
          availableSlots.push({
            shift: routine.shift,
            startTime,
            endTime: this._minutesToTime(current + schedule.minutes_per_slot),
          });
        }
        current += schedule.minutes_per_slot;
      }
    }
    return availableSlots;
  }

  async get_available_shifts(scheduleId: number) {
    // fetch schedule
    const schedule = await this._db
      .selectFrom('schedule')
      .selectAll()
      .where('id', '=', scheduleId)
      .executeTakeFirst();
    if (!schedule) return [];
    // setup date range
    const tomorrow = addDays(startOfToday(), 1);
    const maxDate = addDays(startOfToday(), schedule.max_booking_days);
    // setup result array
    const results: {
      date: string;
      shift: string;
      status: boolean;
    }[] = [];
    // we check each day
    let current = tomorrow;
    while (!isAfter(current, maxDate)) {
      // fetch routine
      const date = format(current, 'yyyy-MM-dd');
      const weekDay = format(current, 'EEEE').toUpperCase() as WeekDayType;
      const routines = await this._db
        .selectFrom('routine')
        .selectAll()
        .where('schedule_id', '=', scheduleId)
        .where('week_day', '=', weekDay)
        .execute();
      // check shifts
      for (const routine of routines) {
        const capacity = Math.floor(
          (this._timeToMinutes(routine.end_time) -
            this._timeToMinutes(routine.start_time)) /
            schedule.minutes_per_slot,
        );
        const booked = await this._db
          .selectFrom('appointment')
          .select((eb) => eb.fn.countAll().as('count'))
          .where('schedule_id', '=', scheduleId)
          .where('date', '=', date as any)
          .where('shift', '=', routine.shift)
          .where('status', '=', 'SCHEDULED')
          .executeTakeFirst();
        const bookedCount = Number(booked?.count ?? 0);
        results.push({
          date,
          shift: routine.shift,
          status: bookedCount < capacity,
        });
      }
      current = addDays(current, 1);
    }
    return results;
  }

  async get_appointments({
    scheduleUuid,
    patientUuid,
    status,
    date,
  }: GetAppointmentsInput) {
    let query = this._db.selectFrom('appointment').selectAll();
    if (scheduleUuid) {
      const schedule = await this.get_schedule_from_uuid(scheduleUuid);
      if (!schedule) return [];
      query = query.where('schedule_id', '=', schedule.id);
    }
    if (patientUuid) {
      const user = await this._userService.find({ uuid: patientUuid });
      if (!user) return [];
      query = query.where('patient_id', '=', user.id);
    }
    if (status) {
      query = query.where('status', '=', status as AppointmentStatusType);
    }
    if (date) {
      query = query.where('date', '=', date as any);
    }
    try {
      return await query.execute();
    } catch (err) {
      this._logger.error(err.msg);
      return [];
    }
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
