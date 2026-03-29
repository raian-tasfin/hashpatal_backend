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

export enum ShiftType {
  MORNING = 'MORNING',
  EVENING = 'EVENING',
}

export enum FoodRelationType {
  BEFORE_EATING = 'BEFORE_EATING',
  AFTER_EATING = 'AFTER_EATING',
  IRRELEVANT = 'IRRELEVANT',
}

export enum DurationUnitType {
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
}

export enum MedicationFrequencyType {
  ONCE_DAILY = 'ONCE_DAILY',
  TWICE_DAILY = 'TWICE_DAILY',
  THREE_TIMES_DAILY = 'THREE_TIMES_DAILY',
  FOUR_TIMES_DAILY = 'FOUR_TIMES_DAILY',
  EVERY_6_HOURS = 'EVERY_6_HOURS',
  EVERY_8_HOURS = 'EVERY_8_HOURS',
}

registerEnumType(RoleType, { name: 'RoleType' });
registerEnumType(WeekDayType, { name: 'WeekDayType' });
registerEnumType(AppointmentStatusType, { name: 'AppointmentStatusType' });
registerEnumType(SchedulableType, { name: 'SchedulableType' });
registerEnumType(ShiftType, { name: 'ShiftType' });
registerEnumType(FoodRelationType, { name: 'FoodRelationType' });
registerEnumType(DurationUnitType, { name: 'DurationUnitType' });
registerEnumType(MedicationFrequencyType, { name: 'MedicationFrequencyType' });

export function create_pg_enum<T extends Record<string, string>>(
  name: string,
  enumObj: T,
) {
  const values = Object.values(enumObj) as [string, ...string[]];
  return pgEnum(name, values);
}
