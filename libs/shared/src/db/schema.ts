import { pgTable, serial, text, uuid, date } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  passwordHash: text('passwordhash').notNull(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  birthDate: date('birthdate').notNull(),
});
