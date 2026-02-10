import { Selectable } from 'kysely';
import {
  User as UserTable,
  RefreshToken as RefreshTokenTable,
  UserRole as UserRoleTable,
  AcademicRecord as AcademicRecordTable,
  DoctorExperience as DoctorExperienceTable,
  DoctorProfile as DoctorProfileTable,
} from './types';

export type User = Selectable<UserTable>;
export type UserRole = Selectable<UserRoleTable>;
export type RefreshToken = Selectable<RefreshTokenTable>;
export type AcademicRecord = Selectable<AcademicRecordTable>;
export type DoctorExperience = Selectable<DoctorExperienceTable>;
export type DoctorProfile = Selectable<DoctorProfileTable>;
