import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@org/shared/auth';
import { LoginGuard, RolesGuard, UseGqlContext } from '@org/shared/guards';
import { Request } from 'express';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { UserModule } from './user';
import { DoctorModule } from './doctor/doctor.module';
import { DepartmentModule } from './department/department.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }: { req: Request }) => ({ req }),
    }),
    AuthModule,
    UserModule,
    DoctorModule,
    DepartmentModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    { provide: APP_GUARD, useClass: UseGqlContext(LoginGuard) },
    { provide: APP_GUARD, useClass: UseGqlContext(RolesGuard) },
  ],
})
export class AppModule {}
