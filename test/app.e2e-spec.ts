import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Client, createClient } from '../src/generated/sdk';
import request from 'supertest';
import 'reflect-metadata';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { format_date } from '@org/shared/date';
import { apply_global_config } from '@org/shared/setup-app';
import { register_user } from '@org/shared/api';

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
 * Automated Mutations
 */

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
    const promise = register_user(sdk, { ...test.user, email: badEmail });
    await expect(promise).rejects.toThrow(
      `email: Invalid email: "${badEmail}"`,
    );
  });

  it('Registration: Failure. Small password', async () => {
    const data = { ...test.user, password: '1' };
    const promise = register_user(sdk, data);
    await expect(promise).rejects.toThrow('Password is too short');
  });

  it('Registration: Failure. Wrong date format', async () => {
    const data = { ...test.user, birthDate: `${new Date()}` };
    const promise = register_user(sdk, data);
    await expect(promise).rejects.toThrow('Invalid date format');
  });

  it('Registration: Failure. Too young', async () => {
    const data = { ...test.user, birthDate: `${format_date(new Date())}` };
    const promise = register_user(sdk, data);
    await expect(promise).rejects.toThrow('You must be at least 18 years old');
  });

  it('Registration: Success', async () => {
    const res = await register_user(sdk, test.user);
    expect(res.user_register?.email).toBe(test.user.email);
  });

  it('Registration: Fiaulre. Double registration.', async () => {
    const promise = register_user(sdk, test.user);
    await expect(promise).rejects.toThrow(
      'A user with this email already exists.',
    );
  });
});
