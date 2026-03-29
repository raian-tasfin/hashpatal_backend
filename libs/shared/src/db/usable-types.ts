import { Selectable } from 'kysely';
import {
  AcademicRecord as AcademicRecordTable,
  Appointment as AppointmentTable,
  DoctorExperience as DoctorExperienceTable,
  DoctorProfile as DoctorProfileTable,
  RefreshToken as RefreshTokenTable,
  Schedule as ScheduleTable,
  UserAccount as UserTable,
  UserRole as UserRoleTable,
  Department as DepartmentTable,
  Routine as RoutineTable,
  Complaint as ComplaintTable,
  Diagnosis as DiagnosisTable,
} from './types';

export type AcademicRecord = Selectable<AcademicRecordTable>;
export type Appointment = Selectable<AppointmentTable>;
export type Department = Selectable<DepartmentTable>;
export type DoctorExperience = Selectable<DoctorExperienceTable>;
export type DoctorProfile = Selectable<DoctorProfileTable>;
export type RefreshToken = Selectable<RefreshTokenTable>;
export type Schedule = Selectable<ScheduleTable>;
export type User = Selectable<UserTable>;
export type UserRole = Selectable<UserRoleTable>;
export type Routine = Selectable<RoutineTable>;
export type Complaint = Selectable<ComplaintTable>;
export type Diagnosis = Selectable<DiagnosisTable>;
