// import {
//   ConflictException,
//   Inject,
//   Injectable,
//   Logger,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import {
//   Appointment,
//   AvailableSlots,
//   BlockedDays,
//   KyselyDatabaseService,
//   OverrideRoutine,
//   RegularRoutine,
//   RoleType,
//   SchedulableType,
//   Schedule,
//   ShiftType,
//   WeekDayType,
// } from '@org/shared/db';
// import { ISlot } from '@org/shared/slots';
// import { DoctorService } from 'src/doctor/doctor.service';
// import { UserService } from 'src/user';
// import {
//   DoctorBlockedDaysAddInput,
//   DoctorBlockedDaysRemoveInput,
//   DoctorOverrideRoutineSyncInput,
//   DoctorRegularRoutineSyncInput,
//   DoctorScheduleSyncInput,
// } from './input';
// import { format_date } from '@org/shared/fields';
// import { SelectQueryBuilder, sql, Transaction } from 'kysely';
// import { addDays, eachDayOfInterval, startOfToday } from 'date-fns';
// import { DB } from '@org/shared/db/types';
//
// const SlotCollectionKey = {
//   regular_routine: 'weekDay',
//   override_routine: 'date',
//   available_slots: 'date',
//   appointment: 'date',
// } as const;
// type SlotCollection = keyof typeof SlotCollectionKey;
// type WeekIndexedSlotCollection = {
//   [K in SlotCollection]: (typeof SlotCollectionKey)[K] extends 'weekDay'
//     ? K
//     : never;
// }[SlotCollection];
// type DateIndexedSlotCollection = Exclude<
//   SlotCollection,
//   WeekIndexedSlotCollection
// >;
// type HasDateScheduleId = DateIndexedSlotCollection | 'blocked_days';
// type QueryBuilder = KyselyDatabaseService | Transaction<DB>;
//
// @Injectable()
// export class ScheduleService {
//   private readonly _logger = new Logger(ScheduleService.name);
//
//   constructor(
//     @Inject(UserService) private readonly userService: UserService,
//     @Inject(DoctorService) private readonly doctorService: DoctorService,
//     @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
//   ) {}
//
/**
 * Public Mutations
 */
// async doctor_schedule_sync({
//   email,
//   minutesPerSlot,
//   maxBookingDays,
// }: DoctorScheduleSyncInput): Promise<Schedule> {
//   return await this._db
//     .with('doctor_info', (db) =>
//       db
//         .selectFrom('user')
//         .innerJoin('user_role', 'user_role.userId', 'user.id')
//         .innerJoin('doctor_profile', 'doctor_profile.userId', 'user.id')
//         .select('doctor_profile.id as doctor_id')
//         .where('user.email', '=', email)
//         .where('user_role.role', '=', RoleType.DOCTOR),
//     )
//     .insertInto('schedule')
//     .columns(['entityId', 'minutesPerSlot', 'maxBookingDays', 'type'])
//     .expression((eb) =>
//       eb
//         .selectFrom('doctor_info')
//         .select([
//           'doctor_id',
//           eb.val(minutesPerSlot).as('minutesPerSlot'),
//           eb.val(maxBookingDays).as('maxBookingDays'),
//           eb.val(SchedulableType.DOCTOR).as('type'),
//         ]),
//     )
//     .onConflict((oc) =>
//       oc.columns(['entityId', 'type']).doUpdateSet({
//         minutesPerSlot: (eb) => eb.ref('excluded.minutesPerSlot'),
//         maxBookingDays: (eb) => eb.ref('excluded.maxBookingDays'),
//       }),
//     )
//     .returningAll()
//     .executeTakeFirstOrThrow(
//       () =>
//         new NotFoundException(`Valid doctor profile for ${email} not found`),
//     );
// }
//
// async doctor_schedule_sync({
//   email,
//   minutesPerSlot,
//   maxBookingDays,
// }: DoctorScheduleSyncInput): Promise<Schedule> {
//   const user = await this.userService.find_by_email({ email });
//   if (!user) throw new NotFoundException(`User "${email}" not found`);
//   const roles = await this.userService._find_roles(user.id);
//   if (!roles.includes(RoleType.DOCTOR)) {
//     throw new UnauthorizedException(`"${email}" is not a DOCTOR.`);
//   }
//   const doctor = await this.doctorService.get_profile(user.id);
//   if (!doctor) {
//     throw new NotFoundException(`Doctor profile not found for "${email}"`);
//   }
//   const entityId = doctor.id;
//   return await this._db
//     .insertInto('schedule')
//     .values({
//       entityId,
//       minutesPerSlot,
//       maxBookingDays,
//       type: SchedulableType.DOCTOR,
//     })
//     .onConflict((oc) =>
//       oc
//         .columns(['entityId', 'type'])
//         .doUpdateSet({ minutesPerSlot, maxBookingDays }),
//     )
//     .returningAll()
//     .executeTakeFirstOrThrow();
// }
//
//   async doctor_regular_routine_sync(
//     data: DoctorRegularRoutineSyncInput,
//     trx: QueryBuilder = this._db,
//   ) {
//     const { email, slots } = data;
//     return await trx.transaction().execute(async (t) => {
//       const schedule = await this._get_doctor_schedule_or_throw(email, t);
//       return this._sync_slots('regular_routine', schedule, slots, t);
//     });
//   }
//
/**
 * Active Utilities
 *
 * The ones that can decide how to respond. Throws exceptions and stuff.
 */
// private async _get_doctor_schedule_or_throw(
//   email: string,
//   trx: QueryBuilder = this._db,
// ): Promise<Schedule> {
//   const user = await this.userService.find_by_email({ email });
//   if (!user) throw new NotFoundException(`User ${email} not found.`);
//   const doctor = await this.doctorService.get_profile(user.id);
//   if (!doctor) throw new NotFoundException(`No doctor profile for ${email}`);
//   const schedule = await this.get_doctor_schedule(doctor.id, trx);
//   if (!schedule) {
//     throw new NotFoundException(`No doctor schedule for ${email}`);
//   }
//   return schedule;
// }
//
/**
 * Private Query Builders
 *
 * These provide repetative queries.
 */
// private _get_schedule(
//   entityId: number,
//   type: SchedulableType,
//   trx: QueryBuilder = this._db,
// ): SelectQueryBuilder<DB, 'schedule', Schedule> {
//   return trx
//     .selectFrom('schedule')
//     .selectAll()
//     .where('entityId', '=', entityId)
//     .where('type', '=', SchedulableType.DOCTOR);
// }
//
// async doctor_override_routine_sync(
//   data: DoctorOverrideRoutineSyncInput,
//   trx: QueryBuilder = this._db,
// ) {
//   const { email, slots } = data;
//   const schedule = await this._get_doctor_schedule_or_throw(email, trx);
//   return this._sync_slots('override_routine', schedule, slots, trx);
// }
//
// async doctor_blocked_days_add(
//   data: DoctorBlockedDaysAddInput,
//   trx: QueryBuilder = this._db,
// ): Promise<boolean> {
//   const { email, dates } = data;
//   const { id: schedulableId } = await this._get_doctor_schedule_or_throw(
//     email,
//     trx,
//   );
//   return this._blocked_days_add(schedulableId, dates, trx);
// }
//
// async doctor_blocked_days_remove(
//   data: DoctorBlockedDaysRemoveInput,
//   trx: QueryBuilder = this._db,
// ): Promise<boolean> {
//   const { email, dates } = data;
//   const { id: schedulableId } = await this._get_doctor_schedule_or_throw(
//     email,
//     trx,
//   );
//   return this._blocked_days_remove(schedulableId, dates, trx);
// }
//
// /**
//  * Queries
//  */
// async get_doctor_schedule(
//   doctorProfileId: number,
//   trx: QueryBuilder = this._db,
// ): Promise<Schedule | undefined> {
//   return await trx
//     .selectFrom('schedule')
//     .selectAll()
//     .where('entityId', '=', doctorProfileId)
//     .where('type', '=', SchedulableType.DOCTOR)
//     .executeTakeFirst();
// }
//
// async get_regular_slots(
//   scheduleId: number,
//   trx: QueryBuilder = this._db,
// ): Promise<RegularRoutine[]> {
//   return await trx
//     .selectFrom('regular_routine')
//     .selectAll()
//     .where('scheduleId', '=', scheduleId)
//     .execute();
// }
//
// async get_override_slots(
//   scheduleId: number,
//   trx: QueryBuilder = this._db,
// ): Promise<OverrideRoutine[]> {
//   return await trx
//     .selectFrom('override_routine')
//     .selectAll()
//     .where('scheduleId', '=', scheduleId)
//     .execute();
// }
//
// async get_blocked_days(
//   scheduleId: number,
//   trx: QueryBuilder = this._db,
// ): Promise<BlockedDays[]> {
//   return await trx
//     .selectFrom('blocked_days')
//     .selectAll()
//     .where('scheduleId', '=', scheduleId)
//     .execute();
// }
//
// async get_available_show_slots(
//   scheduleId: number,
//   trx: QueryBuilder = this._db,
// ): Promise<OverrideRoutine[]> {
//   const { maxBookingDays } = await this._get_schedule(scheduleId, trx);
//   const start = startOfToday();
//   const end = addDays(start, maxBookingDays - 1);
//   const dates = eachDayOfInterval({ start, end }).map(format_date);
//   const nestedResults = await Promise.all(
//     dates.map((date) =>
//       this._get_available_show_slots_date(date, scheduleId, trx),
//     ),
//   );
//   return nestedResults.flat();
// }
//
// /**
//  * Private utilities
//  */
// private _hhmm_to_minutes(t: string): number {
//   const [h, m] = t.split(':').map(Number);
//   return h * 60 + m;
// }
//
// private _minutes_to_hhmm(m: number): string {
//   const hh = Math.floor(m / 60)
//     .toString()
//     .padStart(2, '0');
//   const mm = (m % 60).toString().padStart(2, '0');
//   return `${hh}:${mm}`;
// }
//
// private _to_date_week(
//   inStr: string,
//   to: 'weekDay' | 'date',
// ): string | WeekDayType {
//   if (to === 'weekDay') {
//     if (Object.values(WeekDayType).includes(inStr as WeekDayType)) {
//       return inStr as WeekDayType;
//     }
//     const [year, month, day] = inStr.split('-').map(Number);
//     const dateObj = new Date(year, month - 1, day);
//     return new Intl.DateTimeFormat('en-US', { weekday: 'long' })
//       .format(dateObj)
//       .toUpperCase() as WeekDayType;
//   }
//   return inStr;
// }
//
// private async _sync_slots<T extends ISlot>(
//   table: any,
//   schedule: Schedule,
//   slots: T[],
//   trx: QueryBuilder = this._db,
// ): Promise<boolean> {
//   const { id: scheduleId } = schedule;
//   const executeWork = async (db: QueryBuilder) => {
//     await db.deleteFrom(table).where('scheduleId', '=', scheduleId).execute();
//     await db
//       .insertInto(table)
//       .values(slots.map((s) => ({ ...s, scheduleId })))
//       .execute();
//   };
//   if ('transaction' in trx) {
//     return await trx.transaction().execute(async (newTrx) => {
//       await executeWork(newTrx);
//       return true;
//     });
//   } else {
//     await executeWork(trx);
//     return true;
//   }
// }
//
// private async _blocked_days_add(
//   scheduleId: number,
//   dates: string[],
//   trx: QueryBuilder = this._db,
// ): Promise<boolean> {
//   await trx
//     .insertInto('blocked_days')
//     .values(dates.map((date) => ({ date, scheduleId })))
//     .onConflict((x) => x.doNothing())
//     .execute();
//   return true;
// }
//
// private async _blocked_days_remove(
//   scheduleId: number,
//   dates: string[],
//   trx: QueryBuilder = this._db,
// ): Promise<boolean> {
//   if (dates.length === 0) return true;
//   await trx
//     .deleteFrom('blocked_days')
//     .where('scheduleId', '=', scheduleId)
//     .where(
//       'date',
//       'in',
//       dates.map((d) => new Date(d)),
//     )
//     .execute();
//   return true;
// }
//
// private async _date_has_record(
//   table: HasDateScheduleId,
//   date: string,
//   scheduleId: number,
//   trx: QueryBuilder = this._db,
// ): Promise<boolean> {
//   const res = await trx
//     .selectFrom(table)
//     .select(sql`1`.as('ok'))
//     .where('date', '=', date as any)
//     .where('scheduleId', '=', scheduleId)
//     .limit(1)
//     .executeTakeFirst();
//   return res !== undefined && res !== null;
// }
//
// private async _copy_slots(
//   src: SlotCollection,
//   dest: SlotCollection,
//   indexValue: string,
//   scheduleId: number,
//   trx: QueryBuilder = this._db,
// ) {
//   const srcKey = SlotCollectionKey[src];
//   const destKey = SlotCollectionKey[dest];
//   const lookupValue = this._to_date_week(indexValue, srcKey);
//   const storageValue = this._to_date_week(indexValue, destKey);
//   await trx
//     .insertInto(dest as any)
//     .columns([destKey as any, 'shift', 'startTime', 'endTime', 'scheduleId'])
//     .expression((eb) =>
//       eb
//         .selectFrom(src as any)
//         .select([
//           eb.val(storageValue).as(destKey),
//           'shift',
//           'startTime',
//           'endTime',
//           'scheduleId',
//         ])
//         .where('scheduleId', '=', scheduleId)
//         .where(srcKey as any, '=', lookupValue as any),
//     )
//     .onConflict((oc) => oc.doNothing())
//     .execute();
// }
//
// private async _ensure_override_routine(
//   date: string,
//   scheduleId: number,
//   trx: QueryBuilder = this._db,
// ) {
//   if (await this._date_has_record('override_routine', date, scheduleId, trx))
//     return;
//   await this._copy_slots(
//     'regular_routine',
//     'override_routine',
//     date,
//     scheduleId,
//     trx,
//   );
// }
//
// private async _ensure_available_list(
//   date: string,
//   scheduleId: number,
//   trx: QueryBuilder = this._db,
// ) {
//   if (await this._date_has_record('blocked_days', date, scheduleId, trx))
//     return;
//   if (await this._date_has_record('available_slots', date, scheduleId, trx))
//     return;
//   await this._ensure_override_routine(date, scheduleId, trx);
//   await this._copy_slots(
//     'override_routine',
//     'available_slots',
//     date,
//     scheduleId,
//     trx,
//   );
// }
//
// private async _get_available_show_slots_date(
//   date: string,
//   scheduleId: number,
//   trx: QueryBuilder = this._db,
// ): Promise<OverrideRoutine[]> {
//   await this._ensure_available_list(date, scheduleId, trx);
//   const shiftRows = await trx
//     .selectFrom('available_slots')
//     .select('shift')
//     .distinct()
//     .where('date', '=', date as any)
//     .where('scheduleId', '=', scheduleId)
//     .execute();
//   const shiftValues = shiftRows.map((row) => row.shift);
//   if (shiftValues.length === 0) return [];
//   const showSlots = await trx
//     .selectFrom('override_routine')
//     .selectAll()
//     .where('date', '=', date as any)
//     .where('scheduleId', '=', scheduleId)
//     .where('shift', 'in', shiftValues)
//     .execute();
//   return showSlots;
// }
//
// async _get_available_slots(
//   scheduleId: number,
//   date: string,
//   shift: ShiftType,
//   trx: QueryBuilder = this._db,
// ) {
//   return await trx
//     .selectFrom('available_slots')
//     .selectAll()
//     .where('scheduleId', '=', scheduleId)
//     .where('date', '=', date as any)
//     .where('shift', '=', shift)
//     .orderBy('startTime', 'asc')
//     .execute();
// }
//
// async _get_schedule(scheduleId: number, trx: QueryBuilder = this._db) {
//   return await trx
//     .selectFrom('schedule')
//     .selectAll()
//     .where('id', '=', scheduleId)
//     .executeTakeFirstOrThrow();
// }
//
// async _remove_available_slot(slotId: number, trx: QueryBuilder = this._db) {
//   await trx.deleteFrom('available_slots').where('id', '=', slotId).execute();
// }
//
// async _make_appointment(
//   scheduleId: number,
//   patientId: number,
//   date: string,
//   shift: ShiftType,
// ): Promise<boolean> {
//   return await this._db.transaction().execute(async (trx) => {
//     const slots = await (
//       this._get_available_slots(scheduleId, date, shift, trx) as any
//     )
//       .forUpdate()
//       .execute();
//     const { minutesPerSlot } = await this._get_schedule(scheduleId, trx);
//     for (const { startTime, endTime, id: slotId } of slots) {
//       const startM = this._hhmm_to_minutes(startTime);
//       const endM = this._hhmm_to_minutes(endTime);
//       if (endM - startM < minutesPerSlot) {
//         await this._remove_available_slot(slotId, trx);
//         continue;
//       }
//       const appntEndTimeM = startM + minutesPerSlot;
//       const remainingLen = endM - appntEndTimeM;
//       if (remainingLen < minutesPerSlot) {
//         await this._remove_available_slot(slotId, trx);
//       } else {
//         await trx
//           .updateTable('available_slots')
//           .set({ startTime: this._minutes_to_hhmm(appntEndTimeM) })
//           .where('id', '=', slotId)
//           .execute();
//       }
//       await trx
//         .insertInto('appointment')
//         .values({
//           scheduleId,
//           patientId,
//           date,
//           shift,
//           startTime,
//           endTime: this._minutes_to_hhmm(appntEndTimeM),
//           status: 'SCHEDULED',
//         })
//         .execute();
//       return true;
//     }
//     throw new ConflictException(`No slots found`);
//   });
// }

/**
 * CTEs
 */
// }
