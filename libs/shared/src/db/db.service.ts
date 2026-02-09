import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from './types';

@Injectable()
export class KyselyDatabaseService
  extends Kysely<DB>
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      dialect: new PostgresDialect({
        pool: new Pool({
          connectionString: process.env.DB_URL,
        }),
      }),
    });
  }

  async onModuleInit() {
    await this.introspection.getTables();
  }

  async onModuleDestroy() {
    await this.destroy();
  }
}
