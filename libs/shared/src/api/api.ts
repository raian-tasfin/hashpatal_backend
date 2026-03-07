import { Client } from '@org/sdk';

export function gen_mutation<TData, TSelect>(
  mutationName: string,
  defaultSelect: TSelect,
) {
  return async (
    sdk: Client,
    data: TData,
    selectOverride: Partial<TSelect> = {},
  ): Promise<any> => {
    const result = await sdk.mutation({
      [mutationName]: {
        __args: { data },
        ...defaultSelect,
        ...selectOverride,
      },
    } as any);
    return (result as Record<string, any>)[mutationName];
  };
}

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
