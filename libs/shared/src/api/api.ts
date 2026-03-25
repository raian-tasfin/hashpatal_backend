import { Client } from '@org/sdk';
import { RoleType } from '@org/shared/db';
import { SyncProfileInput } from 'src/doctor/input';
import {
  LoginInput,
  LogoutInput,
  RefreshLoginInput,
  RegisterInput,
  SyncRolesInput,
} from 'src/user/input';

// export function gen_mutation<TData, TSelect>(
//   mutationName: string,
//   defaultSelect: TSelect,
// ) {
//   return async (
//     sdk: Client,
//     data: TData,
//     selectOverride: Partial<TSelect> = {},
//   ): Promise<any> => {
//     const result = await sdk.mutation({
//       [mutationName]: {
//         __args: { data },
//         ...defaultSelect,
//         ...selectOverride,
//       },
//     } as any);
//     return (result as Record<string, any>)[mutationName];
//   };
// }

/**
 * Generators
 */
export function gen_mutation<TData, TSelect = any>(
  mutationName: string,
  defaultSelect?: TSelect,
) {
  return async (
    sdk: Client,
    data: TData,
    selectOverride: Partial<TSelect> = {},
  ): Promise<any> => {
    const result = await sdk.mutation({
      [mutationName]: {
        __args: { data },
        ...(defaultSelect ? { ...defaultSelect, ...selectOverride } : {}),
      },
    } as any);

    return (result as Record<string, any>)[mutationName];
  };
}

export function gen_query<TData, TSelect = any>(
  queryName: string,
  defaultSelect?: TSelect,
) {
  return async (
    sdk: Client,
    data: TData,
    selectOverride: Partial<TSelect> = {},
  ): Promise<any> => {
    const result = await sdk.query({
      [queryName]: {
        __args: { data },
        ...(defaultSelect ? { ...defaultSelect, ...selectOverride } : {}),
      },
    } as any);
    return (result as Record<string, any>)[queryName];
  };
}

/**
 * Models
 */

/**
 * Mutations
 */
export const user_register = gen_mutation<
  RegisterInput,
  { uuid?: boolean; email?: boolean; name?: boolean }
>('user_register', { uuid: true });

export const user_login = gen_mutation<
  LoginInput,
  { accessToken?: boolean; refreshToken?: boolean }
>('user_login', { accessToken: true, refreshToken: true });

export const user_refresh_token = gen_mutation<
  RefreshLoginInput,
  { accessToken?: boolean; refreshToken?: boolean }
>('user_refresh_token', { accessToken: true, refreshToken: true });

export const user_logout = gen_mutation<LogoutInput>('user_logout');

export const user_sync_roles = gen_mutation<SyncRolesInput>('user_sync_roles');

export const doctor_sync_profile = gen_mutation<SyncProfileInput>(
  'doctor_sync_profile',
);

/**
 * Queries
 */
export const user_find = gen_query<
  { email?: string; uuid?: string },
  { uuid?: boolean; email?: boolean; id?: boolean; user_roles?: boolean }
>('user_find', { uuid: true, email: true });
