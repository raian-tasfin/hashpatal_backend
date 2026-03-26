import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@org/shared/db';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DoctorService } from './doctor.service';
import { DoctorUserResolver, DoctorProfileResolver } from './doctor.resolver';
import { UserModule } from 'src/user';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    DepartmentModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [DoctorService, DoctorUserResolver, DoctorProfileResolver],
  exports: [DoctorService],
})
export class DoctorModule {}
