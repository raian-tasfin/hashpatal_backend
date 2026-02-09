import { SetMetadata } from '@nestjs/common';

export const LOGIN_KEY = 'LOGIN_KEY';
export const Login = () => SetMetadata(LOGIN_KEY, true);
