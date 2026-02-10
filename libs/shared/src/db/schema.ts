import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', [
  'ADMIN',
  'DOCTOR',
  'LAB_NURSE',
  'LAB_TECHNICIAN',
  'PATIENT',
]);

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
