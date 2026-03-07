import { Client } from '@org/sdk';

export async function register_user(
  sdk: Client,
  user: {
    email: string;
    name: string;
    password: string;
    birthDate: string;
  },
  selectOverride: { uuid?: boolean; email?: boolean } = {},
) {
  return sdk.mutation({
    user_register: {
      __args: {
        data: { ...user },
      },
      uuid: true,
      ...selectOverride,
    },
  });
}
