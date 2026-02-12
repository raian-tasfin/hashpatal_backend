import { Selectable } from 'kysely';
import {
  AcademicRecord as AcademicRecordTable,
  Appointment as AppointmentTable,
  DoctorExperience as DoctorExperienceTable,
  DoctorProfile as DoctorProfileTable,
  OverrideRoutine as OverrideRoutineTable,
  RefreshToken as RefreshTokenTable,
  RegularRoutine as RegularRoutineTable,
  Schedulable as SchedulableTable,
  User as UserTable,
  UserRole as UserRoleTable,
  BlockedDays as BlockedDaysTable,
} from './types';

export type AcademicRecord = Selectable<AcademicRecordTable>;
export type Appointment = Selectable<AppointmentTable>;
export type DoctorExperience = Selectable<DoctorExperienceTable>;
export type DoctorProfile = Selectable<DoctorProfileTable>;
export type OverrideRoutine = Selectable<OverrideRoutineTable>;
export type RefreshToken = Selectable<RefreshTokenTable>;
export type RegularRoutine = Selectable<RegularRoutineTable>;
export type Schedulable = Selectable<SchedulableTable>;
export type User = Selectable<UserTable>;
export type UserRole = Selectable<UserRoleTable>;
export type BlockedDays = Selectable<BlockedDaysTable>;
