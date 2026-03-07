import { Client } from '@org/sdk';

export async function user_register(
  sdk: Client,
  user: {
    email: string;
    name: string;
    password: string;
    birthDate: string;
  },
  selectOverride: { uuid?: boolean; email?: boolean } = {},
) {
  const result = await sdk.mutation({
    user_register: {
      __args: {
        data: { ...user },
      },
      uuid: true,
      ...selectOverride,
    },
  });
  return result.user_register;
}

export async function user_login(
  sdk: Client,
  loginData: {
    email: string;
    password: string;
  },
  selectOverride: { accessToken?: boolean; refreshToken?: boolean } = {},
) {
  const result = await sdk.mutation({
    user_login: {
      __args: {
        data: { ...loginData },
      },
      accessToken: true,
      refreshToken: true,
      ...selectOverride,
    },
  });
  return result.user_login;
}
