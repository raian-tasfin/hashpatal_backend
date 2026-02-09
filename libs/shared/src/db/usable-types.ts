import { Selectable } from 'kysely';
import {
  User as UserTable,
  RefreshToken as RefreshTokenTable,
  UserRole as UserRoleTable,
} from './types';

export type User = Selectable<UserTable>;
export type UserRole = Selectable<UserRoleTable>;
export type RefreshToken = Selectable<RefreshTokenTable>;
