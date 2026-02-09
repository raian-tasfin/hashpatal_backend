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

export const refreshToken = pgTable('refresh_token', {
  id: serial('id').primaryKey(),
  jit: uuid('jit').notNull().unique(),
  tokenHash: text('tokenHash').notNull().unique(),
  expiresAt: timestamp('expiresAt').notNull(),
  userId: integer('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});
