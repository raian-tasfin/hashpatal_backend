import { Selectable } from 'kysely';
import {
  AcademicRecord as AcademicRecordTable,
  Appointment as AppointmentTable,
  AvailableSlots as AvailableSlotsTable,
  BlockedDays as BlockedDaysTable,
  DoctorExperience as DoctorExperienceTable,
  DoctorProfile as DoctorProfileTable,
  OverrideRoutine as OverrideRoutineTable,
  RefreshToken as RefreshTokenTable,
  RegularRoutine as RegularRoutineTable,
  Schedule as ScheduleTable,
  UserAccount as UserTable,
  UserRole as UserRoleTable,
} from './types';

export type AcademicRecord = Selectable<AcademicRecordTable>;
export type Appointment = Selectable<AppointmentTable>;
export type AvailableSlots = Selectable<AvailableSlotsTable>;
export type BlockedDays = Selectable<BlockedDaysTable>;
export type DoctorExperience = Selectable<DoctorExperienceTable>;
export type DoctorProfile = Selectable<DoctorProfileTable>;
export type OverrideRoutine = Selectable<OverrideRoutineTable>;
export type RefreshToken = Selectable<RefreshTokenTable>;
export type RegularRoutine = Selectable<RegularRoutineTable>;
export type Schedule = Selectable<ScheduleTable>;
export type User = Selectable<UserTable>;
export type UserRole = Selectable<UserRoleTable>;
