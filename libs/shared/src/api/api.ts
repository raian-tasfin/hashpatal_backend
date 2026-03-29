import { Client, FindUserInput } from '@org/sdk';
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

export const from_doctor_find_schedule_uuid = gen_query<
  FindUserInput,
  {
    doctor_profile?: {
      schedule?: {
        uuid?: boolean;
      };
    };
  }
>('user_find', {
  doctor_profile: {
    schedule: {
      uuid: true,
    },
  },
});

// import { Client } from '@org/sdk';
// import { RoleType } from '@org/shared/db';
// import { SyncProfileInput } from 'src/doctor/input';
// import { FindDepartmentInput, AddDepartmentInput } from 'src/department/input';
// import {
//   GetAppointmentsInput,
//   MakeAppointmentInput,
//   RoutineSyncInput,
//   ScheduleSyncInput,
// } from 'src/schedule/input';
// import {
//   LoginInput,
//   LogoutInput,
//   RefreshLoginInput,
//   RegisterInput,
//   SyncRolesInput,
//   FindUserInput,
// } from 'src/user/input';
//
// /**
//  * Generators
//  */
// export function gen_mutation<TData, TSelect = any>(
//   mutationName: string,
//   defaultSelect?: TSelect,
// ) {
//   return async (
//     sdk: Client,
//     data: TData,
//     selectOverride: Partial<TSelect> = {},
//   ): Promise<any> => {
//     const result = await sdk.mutation({
//       [mutationName]: {
//         __args: { data },
//         ...(defaultSelect ? { ...defaultSelect, ...selectOverride } : {}),
//       },
//     } as any);
//     return (result as Record<string, any>)[mutationName];
//   };
// }
//
// export function gen_query<TData, TSelect = any>(
//   queryName: string,
//   defaultSelect?: TSelect,
// ) {
//   return async (
//     sdk: Client,
//     data: TData,
//     selectOverride: Partial<TSelect> = {},
//   ): Promise<any> => {
//     const result = await sdk.query({
//       [queryName]: {
//         __args: { data },
//         ...(defaultSelect ? { ...defaultSelect, ...selectOverride } : {}),
//       },
//     } as any);
//     return (result as Record<string, any>)[queryName];
//   };
// }
//
// /**
//  * User Mutations
//  */
// export const user_register = gen_mutation<
//   RegisterInput,
//   { uuid?: boolean; email?: boolean; name?: boolean }
// >('user_register', { uuid: true, email: true, name: true });
//
// export const user_login = gen_mutation<
//   LoginInput,
//   { accessToken?: boolean; refreshToken?: boolean }
// >('user_login', { accessToken: true, refreshToken: true });
//
// export const user_refresh_token = gen_mutation<
//   RefreshLoginInput,
//   { accessToken?: boolean; refreshToken?: boolean }
// >('user_refresh_token', { accessToken: true, refreshToken: true });
//
// export const user_logout = gen_mutation<LogoutInput>('user_logout');
//
// export const user_sync_roles = gen_mutation<SyncRolesInput>('user_sync_roles');
//
// /**
//  * User Queries
//  */
// export const user_find = gen_query<
//   FindUserInput,
//   {
//     uuid?: boolean;
//     email?: boolean;
//     name?: boolean;
//     user_roles?: boolean;
//     doctor_profile?: {
//       id?: boolean;
//       scheduleId?: boolean;
//       schedule?: {
//         uuid?: boolean;
//         minutes_per_slot?: boolean;
//         max_booking_days?: boolean;
//         available_shifts?: {
//           date?: boolean;
//           shift?: boolean;
//           status?: boolean;
//         };
//       };
//       experience?: {
//         title?: boolean;
//         organization?: boolean;
//         location?: boolean;
//         startYear?: boolean;
//         endYear?: boolean;
//       };
//       academic_record?: {
//         degree?: boolean;
//         institute?: boolean;
//         year?: boolean;
//       };
//     };
//   }
// >('user_find', { uuid: true, email: true, name: true });
//
// /**
//  * Doctor Mutations
//  */
// export const doctor_sync_profile = gen_mutation<SyncProfileInput>(
//   'doctor_sync_profile',
// );
//
// /**
//  * Department Mutations
//  */
// export const department_add =
//   gen_mutation<AddDepartmentInput>('department_add');
//
// /**
//  * Department Queries
//  */
// export const department_fetch_all = async (
//   sdk: Client,
//   select: {
//     name?: boolean;
//     uuid?: boolean;
//     doctors?: {
//       uuid?: boolean;
//       email?: boolean;
//       name?: boolean;
//       doctor_profile?: {
//         id?: boolean;
//         scheduleId?: boolean;
//         schedule?: {
//           uuid?: boolean;
//           minutes_per_slot?: boolean;
//           max_booking_days?: boolean;
//           available_shifts?: {
//             date?: boolean;
//             shift?: boolean;
//             status?: boolean;
//           };
//         };
//         experience?: {
//           title?: boolean;
//           organization?: boolean;
//         };
//         academic_record?: {
//           degree?: boolean;
//           institute?: boolean;
//           year?: boolean;
//         };
//       };
//     };
//   } = { name: true, uuid: true },
// ) => {
//   const result = await sdk.query({
//     department_fetch_all: select,
//   } as any);
//   return (result as any).department_fetch_all;
// };
//
// export const department_find = gen_query<
//   FindDepartmentInput,
//   {
//     name?: boolean;
//     uuid?: boolean;
//     doctors?: {
//       uuid?: boolean;
//       email?: boolean;
//       name?: boolean;
//       doctor_profile?: {
//         schedule?: {
//           uuid?: boolean;
//           available_shifts?: {
//             date?: boolean;
//             shift?: boolean;
//             status?: boolean;
//           };
//         };
//       };
//     };
//   }
// >('department_find', { name: true, uuid: true });
//
// /**
//  * Schedule Mutations
//  */
// export const schedule_sync = gen_mutation<ScheduleSyncInput>('schedule_sync');
//
// export const routine_sync = gen_mutation<RoutineSyncInput>('routine_sync');
//
// export const make_appointment =
//   gen_mutation<MakeAppointmentInput>('make_appointment');
//
// /**
//  * Schedule Queries
//  */
// export const get_appointments = gen_query<
//   GetAppointmentsInput,
//   {
//     id?: boolean;
//     uuid?: boolean;
//     date?: boolean;
//     shift?: boolean;
//     startTime?: boolean;
//     endTime?: boolean;
//     status?: boolean;
//   }
// >('get_appointments', {
//   uuid: true,
//   date: true,
//   shift: true,
//   startTime: true,
//   endTime: true,
//   status: true,
// });
