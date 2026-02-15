import { ImATeapotException } from '@nestjs/common';
import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  time,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import {
  create_pg_enum,
  RoleType,
  WeekDayType,
  AppointmentStatusType,
  SchedulableType,
  ShiftType,
} from './_enums';

/**
 * Enums
 */
export const roleEnum = create_pg_enum('role_type', RoleType);
export const schedulableTypeEnum = pgEnum('schedulable_type', SchedulableType);
export const weekDayEnum = create_pg_enum('weekday_type', WeekDayType);
export const appointmentStatusEnum = create_pg_enum(
  'appointment_status_type',
  AppointmentStatusType,
);
export const shiftEnum = create_pg_enum('shift_type', ShiftType);

/**
 * Users
 */
export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  passwordHash: text('passwordHash').notNull(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  birthDate: date('birthDate').notNull(),
});

export const userRole = pgTable(
  'user_role',
  {
    id: serial('id').primaryKey(),
    role: roleEnum('role').notNull(),
    userId: integer('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (t) => [unique('user_role_composite_pk').on(t.userId, t.role)],
);

/**
 * Login
 */

export const refreshToken = pgTable('refresh_token', {
  id: serial('id').primaryKey(),
  jit: uuid('jit').notNull().unique(),
  tokenHash: text('tokenHash').notNull().unique(),
  expiresAt: timestamp('expiresAt').notNull(),
  userId: integer('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

/**
 * Schedule and Appointment
 */
export const schedule = pgTable(
  'schedule',
  {
    id: serial('id').primaryKey(),
    entityId: integer('entityId').notNull(),
    schedulableType: schedulableTypeEnum('type').notNull(),
    minutesPerSlot: integer('minutesPerSlot').notNull(),
    maxBookingDays: integer('maxBookingDays').notNull(),
  },
  (t) => [unique('schedule_unique').on(t.entityId, t.schedulableType)],
);

export const regularRoutine = pgTable(
  'regular_routine',
  {
    id: serial('id').primaryKey(),
    weekDay: weekDayEnum('weekDay').notNull(),
    shift: shiftEnum('shift').notNull(),
    startTime: time('startTime').notNull(),
    endTime: time('endTime').notNull(),
    scheduleId: integer('scheduleId')
      .notNull()
      .references(() => schedule.id, { onDelete: 'cascade' }),
  },
  (t) => [
    unique('regular_routine_unique').on(t.weekDay, t.shift, t.scheduleId),
  ],
);

export const overrideRoutine = pgTable(
  'override_routine',
  {
    id: serial('id').primaryKey(),
    date: date('date').notNull(),
    shift: shiftEnum('shift').notNull(),
    startTime: time('startTime').notNull(),
    endTime: time('endTime').notNull(),
    scheduleId: integer('scheduleId')
      .notNull()
      .references(() => schedule.id, { onDelete: 'cascade' }),
  },
  (t) => [unique('override_routine_unique').on(t.date, t.shift, t.scheduleId)],
);

export const blockedDays = pgTable(
  'blocked_days',
  {
    id: serial('id').primaryKey(),
    date: date('date').notNull(),
    scheduleId: integer('scheduleId')
      .notNull()
      .references(() => schedule.id, { onDelete: 'cascade' }),
  },
  (t) => [unique('blocked_days_unique').on(t.scheduleId, t.date)],
);

export const availableSlots = pgTable(
  'available_slots',
  {
    id: serial('id').primaryKey(),
    date: date('date').notNull(),
    scheduleId: integer('scheduleId')
      .notNull()
      .references(() => schedule.id, { onDelete: 'cascade' }),
    shift: shiftEnum('shift').notNull(),
    startTime: time('startTime').notNull(),
    endTime: time('endTime').notNull(),
  },
  (t) => [
    unique('available_slots_unique').on(t.scheduleId, t.date, t.startTime),
  ],
);

export const appointment = pgTable('appointment', {
  id: serial('id').primaryKey(),
  scheduleId: integer('scheduleId')
    .notNull()
    .references(() => schedule.id, { onDelete: 'cascade' }),
  patientId: integer('patientId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  shift: shiftEnum('shift').notNull(),
  startTime: time('startTime').notNull(),
  endTime: time('endTime').notNull(),
  status: appointmentStatusEnum('status').notNull(),
});

/**
 * Doctor
 */

export const doctorProfile = pgTable('doctor_profile', {
  id: serial('id').primaryKey(),
  userId: integer('userId')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  scheduleId: integer('scheduleId')
    .unique()
    .references(() => schedule.id, { onDelete: 'set null' }),
});

export const doctorExperience = pgTable('doctor_experience', {
  id: serial('id').primaryKey(),
  doctorProfileId: integer('doctorProfileId')
    .notNull()
    .references(() => doctorProfile.id, { onDelete: 'cascade' }),
  startYear: date('startYear').notNull(),
  endYear: date('endYear'),
  title: text('title').notNull(),
  organization: text('organization').notNull(),
  location: text('location'),
});

export const academicRecord = pgTable('academic_record', {
  id: serial('id').primaryKey(),
  doctorProfileId: integer('doctorProfileId')
    .notNull()
    .references(() => doctorProfile.id, { onDelete: 'cascade' }),
  degree: text('degree').notNull(),
  institute: text('institute').notNull(),
  year: date('year').notNull(),
});
