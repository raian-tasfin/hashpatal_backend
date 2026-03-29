import { ImATeapotException } from '@nestjs/common';
import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  time,
  timestamp,
  unique,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';
import {
  AppointmentStatusType,
  create_pg_enum,
  RoleType,
  SchedulableType,
  ShiftType,
  WeekDayType,
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
export const user = pgTable('user_account', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  birthDate: date('birth_date').notNull(),
});

export const userRole = pgTable(
  'user_role',
  {
    id: serial('id').primaryKey(),
    role: roleEnum('role').notNull(),
    userId: integer('user_id')
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
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  userId: integer('user_id')
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
    entityId: integer('entity_id').notNull(),
    uuid: uuid('uuid').defaultRandom().notNull().unique(),
    schedulableType: schedulableTypeEnum('type').notNull(),
    minutesPerSlot: integer('minutes_per_slot').notNull(),
    maxBookingDays: integer('max_booking_days').notNull(),
  },
  (t) => [unique('schedule_unique').on(t.entityId, t.schedulableType)],
);

export const routine = pgTable(
  'routine',
  {
    id: serial('id').primaryKey(),
    weekDay: weekDayEnum('week_day').notNull(),
    shift: shiftEnum('shift').notNull(),
    startTime: time('start_time').notNull(),
    endTime: time('end_time').notNull(),
    scheduleId: integer('schedule_id')
      .notNull()
      .references(() => schedule.id, { onDelete: 'cascade' }),
  },
  (t) => [unique('routine_unique').on(t.weekDay, t.shift, t.scheduleId)],
);

export const appointment = pgTable('appointment', {
  id: serial('id').primaryKey(),
  scheduleId: integer('schedule_id')
    .notNull()
    .references(() => schedule.id, { onDelete: 'cascade' }),
  patientId: integer('patient_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  date: date('date').notNull(),
  shift: shiftEnum('shift').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  status: appointmentStatusEnum('status').notNull(),
});

/**
 * Doctor
 */
export const doctorProfile = pgTable('doctor_profile', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  scheduleId: integer('scheduleId')
    .unique()
    .references(() => schedule.id, { onDelete: 'set null' }),
  department: integer('department_id').references(() => department.id, {
    onDelete: 'set null',
  }),
});

export const doctorExperience = pgTable('doctor_experience', {
  id: serial('id').primaryKey(),
  doctorProfileId: integer('doctor_profile_id')
    .notNull()
    .references(() => doctorProfile.id, { onDelete: 'cascade' }),
  startYear: date('start_year').notNull(),
  endYear: date('end_year'),
  title: text('title').notNull(),
  organization: text('organization').notNull(),
  location: text('location'),
});

export const academicRecord = pgTable('academic_record', {
  id: serial('id').primaryKey(),
  doctorProfileId: integer('doctor_profile_id')
    .notNull()
    .references(() => doctorProfile.id, { onDelete: 'cascade' }),
  degree: text('degree').notNull(),
  institute: text('institute').notNull(),
  year: date('year').notNull(),
});

/**
 * Department
 */
export const department = pgTable('department', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  name: text('name').notNull().unique(),
});
