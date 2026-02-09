import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordModule } from '@org/shared/password';
import { KyselyDatabaseService } from '@org/shared/db';

@Module({
  imports: [PasswordModule, KyselyDatabaseService],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
