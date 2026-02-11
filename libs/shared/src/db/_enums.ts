import { registerEnumType } from '@nestjs/graphql';
import { pgEnum } from 'drizzle-orm/pg-core';

export enum RoleType {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  LAB_NURSE = 'LAB_NURSE',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  PATIENT = 'PATIENT',
}

export enum WeekDayType {
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
}

export enum AppointmentStatusType {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DIDNTSHOW = 'DIDNTSHOW',
}

export enum SchedulableType {
  DOCTOR = 'DOCTOR',
}

registerEnumType(RoleType, { name: 'RoleType' });
registerEnumType(WeekDayType, { name: 'WeekDayType' });
registerEnumType(AppointmentStatusType, { name: 'AppointmentStatusType' });
registerEnumType(SchedulableType, { name: 'SchedulableType' });

export function create_pg_enum<T extends Record<string, string>>(
  name: string,
  enumObj: T,
) {
  const values = Object.values(enumObj) as [string, ...string[]];
  return pgEnum(name, values);
}
