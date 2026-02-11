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
} from './_enums';

export const roleEnum = create_pg_enum('role_type', RoleType);
export const schedulableTypeEnum = pgEnum('schedulable_type', SchedulableType);
export const weekDayEnum = create_pg_enum('weekday_type', WeekDayType);
export const appointmentStatusEnum = create_pg_enum(
  'appointment_status_type',
  AppointmentStatusType,
);

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

export const doctorProfile = pgTable('doctor_profile', {
  id: serial('id').primaryKey(),
  userId: integer('userId')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  schedulableId: integer('schedulableId')
    .unique()
    .references(() => schedulable.id, { onDelete: 'set null' }),
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

export const refreshToken = pgTable('refresh_token', {
  id: serial('id').primaryKey(),
  jit: uuid('jit').notNull().unique(),
  tokenHash: text('tokenHash').notNull().unique(),
  expiresAt: timestamp('expiresAt').notNull(),
  userId: integer('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const schedulable = pgTable('schedulable', {
  id: serial('id').primaryKey(),
  entityId: integer('entityId').notNull(),
  schedulableType: schedulableTypeEnum('type').notNull(),
  minutesPerSlot: integer('minutesPerSlot').notNull(),
});

/* overlaps and stuff are to be handled service layer. instead of
 * add/delete make sync the only functionality.
 */
export const regularRoutine = pgTable('regular_routine', {
  id: serial('id').primaryKey(),
  weekDay: weekDayEnum('weekDay').notNull(),
  startTime: time('startTime').notNull(),
  endTime: time('endTime').notNull(),
  schedulableId: integer('schedulableId')
    .notNull()
    .references(() => schedulable.id, { onDelete: 'cascade' }),
});

export const overrideRoutine = pgTable('override_routine', {
  id: serial('id').primaryKey(),
  date: date('date').notNull(),
  weekDay: weekDayEnum('weekDay').notNull(),
  startTime: time('startTime').notNull(),
  endTime: time('endTime').notNull(),
  schedulableId: integer('schedulableId')
    .notNull()
    .references(() => schedulable.id, { onDelete: 'cascade' }),
});

export const appointment = pgTable('appointment', {
  id: serial('id').primaryKey(),
  schedulableId: integer('schedulableId')
    .notNull()
    .references(() => schedulable.id, { onDelete: 'cascade' }),
  startTime: time('startTime').notNull(),
  endTime: time('endTime').notNull(),
  minutesPerSlot: integer('minutesPerSlot').notNull(),
  status: appointmentStatusEnum('status').notNull(),
});
