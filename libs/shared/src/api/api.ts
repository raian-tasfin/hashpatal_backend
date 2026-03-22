import { Client } from '@org/sdk';
import { RoleType } from '@org/shared/db';

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
 * Mutations
 */
export const user_register = gen_mutation<
  {
    email: string;
    name: string;
    password: string;
    birthDate: string;
  },
  { uuid?: boolean; email?: boolean; name?: boolean }
>('user_register', { uuid: true });

export const user_login = gen_mutation<
  {
    email: string;
    password: string;
  },
  { accessToken?: boolean; refreshToken?: boolean }
>('user_login', { accessToken: true, refreshToken: true });

export const user_refresh_token = gen_mutation<
  {
    refreshToken: string;
  },
  { accessToken?: boolean; refreshToken?: boolean }
>('user_refresh_token', { accessToken: true, refreshToken: true });

export const user_logout = gen_mutation<{
  refreshToken: string;
}>('user_logout');

export const user_sync_roles = gen_mutation<{
  uuid: string;
  roles: RoleType[];
}>('user_sync_roles');

/**
 * Queries
 */
export const user_find = gen_query<
  { email?: string; uuid?: string },
  { uuid?: boolean; email?: boolean; id?: boolean; user_roles?: boolean }
>('user_find', { uuid: true, email: true });
