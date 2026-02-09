import { Selectable } from 'kysely';
import { User as UserTable } from './types';

export type User = Selectable<UserTable>;
