import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@org/shared/db';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user';
import { DoctorModule } from 'src/doctor/doctor.module';
import { ConsultanceService } from './consultance.service';
import { AppointmentResolver, PatientResolver } from './consultance.resolver';

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
  providers: [ConsultanceService, AppointmentResolver, PatientResolver],
  exports: [ConsultanceService, AppointmentResolver, PatientResolver],
})
export class ConsultanceModule {}
