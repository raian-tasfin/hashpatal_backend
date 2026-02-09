import { INestApplicationContext, Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import data from './seed-data.json';
import { ConfigModule } from '@nestjs/config';
import { PasswordModule } from '@org/shared/password';
import { DatabaseModule } from '@org/shared/db';
// import { UserRolesModule } from 'src/user-roles/user-roles.module';
// import { UserRolesService } from 'src/user-roles/user-roles.service';
import { Role } from '@org/shared/db';
// import { DoctorModule } from 'src/doctor/doctor.module';
// import { ScheduleModule } from 'src/schedule/schedule.module';
// import { ScheduleService } from 'src/schedule/schedule.service';
// import { DoctorService } from 'src/doctor/doctor.service';

const logger = new Logger('seed');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    PasswordModule,
    DatabaseModule,
    UserModule,
    //     UserRolesModule,
    //     ScheduleModule,
    //     DoctorModule,
  ],
})
class SeedModule {}

async function register_users(app: INestApplicationContext) {
  const userService = app.get(UserService);
  logger.log('Registering users...');
  for (const { email, password, name, birthDate } of data.users) {
    logger.log(`Registring user: ${email}`);
    try {
      const user = await userService.register({
        email,
        password,
        name,
        birthDate,
      });
      if (!user) throw Error(`Failed creating user ${email}`);
    } catch (err) {
      logger.log(`Skipping user: ${email}`);
      logger.error(err.message);
    }
  }
  logger.log(`User registration phase complete.`);
}

// async function assign_roles(app: INestApplicationContext) {
//   const userService = app.get(UserService);
//   const userRolesService = app.get(UserRolesService);
//   logger.log('Assigning roles to users...');
//   for (const { email, roles } of data.users) {
//     logger.log(`Processing user: ${email}`);
//     try {
//       logger.log(`Finding user: ${email}...`);
//       const user = await userService.find_by_email({ email });
//       logger.log(`User ${email} found.`);
//       await userRolesService.sync({
//         uuid: user.uuid,
//         roles: roles as Role[],
//       });
//       logger.log(`Updated roles for ${email} to ${roles}`);
//     } catch (err) {
//       logger.log(`Skipping user: ${email}`);
//       logger.error(err.message);
//     }
//   }
//   logger.log(`Role assignment phase complete.`);
// }
//
// async function create_doctor_profiles(app: INestApplicationContext) {
//   const userService = app.get(UserService);
//   const doctorService = app.get(DoctorService);
//   logger.log('Creating doctor profiles...');
//   for (const { email, academic, experience } of data.doctorProfiles) {
//     logger.log(`Processing user: ${email}`);
//     try {
//       logger.log(`Finding user: ${email}...`);
//       const { uuid } = await userService.find_by_email({ email });
//       logger.log(`User ${email} found.`);
//       await doctorService.update_doctor_profile({
//         experience,
//         academic,
//         uuid,
//       });
//       logger.log(`Created doctor profile for ${email}.`);
//     } catch (err) {
//       logger.log(`Skipping user: ${email}`);
//       logger.error(err.message);
//     }
//   }
//   logger.log(`Doctor profile creation phase complete.`);
// }
//
// async function create_doctor_regular_schedules(app: INestApplicationContext) {
//   logger.log('Creating regular schedules for doctors...');
//   const scheduleService = app.get(ScheduleService);
//   for (const { email, schedule } of data.doctorProfiles) {
//     const { minutesPerSlot } = schedule;
//     logger.log(`Processing user: ${email}`);
//     try {
//       logger.log(`Adding schedule`);
//       await scheduleService.create_doctor_schedule({ email, minutesPerSlot });
//       logger.log(`Created schedule for ${email}.`);
//     } catch (err) {
//       logger.log(`Skipping user: ${email}`);
//       logger.error(err.message);
//     }
//   }
//   logger.log(`Doctor schedule creation phase complete.`);
// }
//
// async function add_doctor_regular_slots(app: INestApplicationContext) {
//   logger.log('Adding regular slots for doctors...');
//   const scheduleService = app.get(ScheduleService);
//   for (const { email, regularSlots } of data.doctorProfiles) {
//     logger.log(`Processing slots for: ${email}`);
//     try {
//       const result = await scheduleService.add_doctor_regular_slots({
//         email,
//         regularSlots: regularSlots as any,
//       });
//       logger.log(
//         `Successfully added ${result.count} exploded slots for ${email}.`,
//       );
//     } catch (err) {
//       logger.log(`Skipping slots for: ${email}`);
//       logger.error(err.message);
//     }
//   }
//   logger.log(`Regular slots addition phase complete.`);
// }
//
// async function add_doctor_override_slots(app: INestApplicationContext) {
//   logger.log('Adding override slots for doctors...');
//   const scheduleService = app.get(ScheduleService);
//   for (const { email, overrideSlots } of data.doctorProfiles) {
//     if (!overrideSlots || overrideSlots.length === 0) continue;
//     logger.log(`Processing overrides for: ${email}`);
//     try {
//       const result = await scheduleService.update_doctor_override_slots({
//         email,
//         overrideSlots: overrideSlots as any,
//       });
//       logger.log(
//         `Successfully created ${result.count} exploded override slots for ${email}.`,
//       );
//     } catch (err) {
//       logger.log(`Skipping overrides for: ${email}`);
//       logger.error(err.message);
//     }
//   }
//   logger.log(`Override slots addition phase complete.`);
// }

async function bootstrap() {
  logger.log('Seeding database...');
  const app = await NestFactory.createApplicationContext(SeedModule);

  await register_users(app);
  // await assign_roles(app);
  // await create_doctor_profiles(app);
  // await create_doctor_regular_schedules(app);
  // await add_doctor_regular_slots(app);
  // await add_doctor_override_slots(app);
  logger.log('Finished seeding database.');
  await app.close();
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
