import { Module } from '@nestjs/common';
import { KyselyDatabaseService } from './db.service';

@Module({
  providers: [KyselyDatabaseService],
  exports: [KyselyDatabaseService],
})
export class DatabaseModule {}
