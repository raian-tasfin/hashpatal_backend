import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@org/shared/db';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleService } from './schedule.service';
import {
  DoctorScheduleResolver,
  SchedulableResolver,
  ScheduleResolver,
} from './schedule.resolver';
import { UserModule } from 'src/user';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    DoctorModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [
    ScheduleService,
    ScheduleResolver,
    DoctorScheduleResolver,
    SchedulableResolver,
  ],
  exports: [ScheduleResolver, ScheduleService, DoctorScheduleResolver],
})
export class ScheduleModule {}
