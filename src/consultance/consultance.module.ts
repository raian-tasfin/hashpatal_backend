import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@org/shared/db';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user';
import { DoctorModule } from 'src/doctor/doctor.module';
import { ConsultanceService } from './consultance.service';
import {
  AppointmentResolver,
  PatientResolver,
  ConsultanceResolver,
} from './consultance.resolver';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    DoctorModule,
    ScheduleModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [
    ConsultanceService,
    AppointmentResolver,
    PatientResolver,
    ConsultanceResolver,
  ],
  exports: [
    ConsultanceService,
    AppointmentResolver,
    PatientResolver,
    ConsultanceResolver,
  ],
})
export class ConsultanceModule {}
