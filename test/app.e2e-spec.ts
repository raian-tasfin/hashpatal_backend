import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Client, createClient } from '../src/generated/sdk';
import request from 'supertest';
import 'reflect-metadata';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { format_date } from '@org/shared/date';
import { apply_global_config } from '@org/shared/setup-app';
import {
  user_register,
  user_login,
  user_refresh_token,
  user_logout,
  user_sync_roles,
  user_find,
} from '@org/shared/api';

const logger = new Logger();

/**
 * Test Data
 */
const test = {
  user: {
    email: `test-${Date.now()}@mail.com`,
    name: 'Test Porikh',
    password: '1234',
    birthDate: '2000-01-01',
  },
};

/**
 * Expectations
 */
function expect_valid_token_pair(accessToken: string, refreshToken: string) {
  expect(accessToken).toBeTypeOf('string');
  expect(accessToken.length).toBeGreaterThan(0);
  expect(refreshToken).toBeTypeOf('string');
  expect(refreshToken.length).toBeGreaterThan(0);
}

/**
 * Test Suite
 */
describe('End-to-End System Test', () => {
  let app: any;
  let sdk: Client;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    apply_global_config(app);
    await app.init();
    sdk = createClient({
      fetcher: async (operation) => {
        const response = await request(app.getHttpServer())
          .post('/graphql')
          .send(operation);
        return response.body;
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  /**
   * Registering User
   */
  it('Registration: Failure. Bad email', async () => {
    const badEmail = 'bad email';
    const promise = user_register(sdk, { ...test.user, email: badEmail });
    await expect(promise).rejects.toThrow(
      `email: Invalid email: "${badEmail}"`,
    );
  });

  it('Registration: Failure. Small password', async () => {
    const data = { ...test.user, password: '1' };
    const promise = user_register(sdk, data);
    await expect(promise).rejects.toThrow('Password is too short');
  });

  it('Registration: Failure. Wrong date format', async () => {
    const data = { ...test.user, birthDate: `${new Date()}` };
    const promise = user_register(sdk, data);
    await expect(promise).rejects.toThrow('Invalid date format');
  });

  it('Registration: Failure. Too young', async () => {
    const data = { ...test.user, birthDate: `${format_date(new Date())}` };
    const promise = user_register(sdk, data);
    await expect(promise).rejects.toThrow('You must be at least 18 years old');
  });

  it('Registration: Success', async () => {
    const { email } = await user_register(sdk, test.user, { email: true });
    expect(email).toBe(test.user.email);
  });

  it('Registration: Fiaulre. Double registration.', async () => {
    const promise = user_register(sdk, test.user);
    await expect(promise).rejects.toThrow(
      'A user with this email already exists.',
    );
  });

  /**
   * Login
   */
  // invalid email format
  it('Login: Failure. Invalid email', async () => {
    const badEmail = 'bad email';
    const login = {
      email: badEmail,
      password: test.user.password,
    };
    const promise = user_login(sdk, login);
    await expect(promise).rejects.toThrow(
      `email: Invalid email: "${badEmail}"`,
    );
  });

  // invalid password format
  it('Login: Failure. Password too short', async () => {
    const data = { email: test.user.email, password: '1' };
    const promise = user_login(sdk, data);
    await expect(promise).rejects.toThrow('Password is too short');
  });

  // email not found
  it('Login: Failure. Email not found', async () => {
    let { email, password } = test.user;
    email = 'nonexistent-' + email;
    const promise = user_login(sdk, { email, password });
    await expect(promise).rejects.toThrow(`User ${email} not found.`);
  });

  // invalid password for given email
  it('Login: Failure. Invalid password', async () => {
    const { email } = test.user;
    const password = 'noto test users password';
    const promise = user_login(sdk, { email, password });
    await expect(promise).rejects.toThrow(`Invalid password`);
  });

  // success
  it('Login: Success.', async () => {
    const { email, password } = test.user;
    const { accessToken, refreshToken } = await user_login(sdk, {
      email,
      password,
    });
    expect_valid_token_pair(accessToken, refreshToken);
  });

  /**
   * Refresh Token
   */
  // invalid token format
  it('Refresh token: Failure. Invalid Token', async () => {
    const promise = user_refresh_token(sdk, { refreshToken: 'abc' });
    await expect(promise).rejects.toThrow('Invalid refresh token');
  });

  // success
  it('Refresh token: Success.', async () => {
    const { email, password } = test.user;
    const { refreshToken } = await user_login(sdk, { email, password });
    const res = await user_refresh_token(sdk, {
      refreshToken,
    });
    expect_valid_token_pair(res.accessToken, res.refreshToken);
  });

  /**
   * Loguot
   */
  // invalid token
  it('Logout: Failure. Invalid Token', async () => {
    const promise = user_logout(sdk, { refreshToken: 'abc' });
    await expect(promise).rejects.toThrow('Invalid refresh token');
  });

  // success
  it('Logout: Success.', async () => {
    const { email, password } = test.user;
    const { refreshToken } = await user_login(sdk, { email, password });
    const res = await user_logout(sdk, { refreshToken });
    expect(res).toBe(true);
  });

  /**
   * Find By Email
   */
  it('Find User: Failure. Not Found', async () => {
    const res = await user_find(sdk, { email: 'nonexistence@mail.com' });
    expect(res).toBe(null);
  });

  it('Find user: Success.', async () => {
    const email = 'patient@mail.com';
    const res = await user_find(sdk, { email });
    expect(res).toBeDefined();
    expect(res).toHaveProperty('email', email);
  });

  /**
   * Sync Roles
   */
  it('Sync Roles: Invalid UUID', async () => {
    const promise = user_sync_roles(sdk, {
      uuid: '1',
      roles: ['PATIENT', 'DOCTOR'],
    });
    expect(promise).rejects.toThrow('uuid must be a UUID');
  });

  it('Sync Roles: Success', async () => {
    const { uuid } = await user_find(sdk, { email: 'patient@mail.com' });
    const res = await user_sync_roles(sdk, {
      uuid,
      roles: ['PATIENT', 'DOCTOR'],
    });
    expect(res).toBe(true);
  });

  /**
   * Find Roles
   */
  it('Find user roles: Success.', async () => {
    const email = 'patient@mail.com';
    const res = await user_find(sdk, { email }, { user_roles: true });
    expect(res).toBeDefined();
    expect(res).toHaveProperty('user_roles');
  });

  /**
   * Suync Doctor Profile
   */
});
