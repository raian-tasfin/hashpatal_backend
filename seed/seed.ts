import {
  INestApplicationContext,
  Logger,
  Module,
  NotFoundException,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import data from './seed-data.json';
import { ConfigModule } from '@nestjs/config';
import { PasswordModule } from '@org/shared/password';
import { DatabaseModule, RegularRoutine, WeekDayType } from '@org/shared/db';
// import { UserRolesModule } from 'src/user-roles/user-roles.module';
// import { UserRolesService } from 'src/user-roles/user-roles.service';
import { RoleType } from '@org/shared/db';
import { DoctorModule } from 'src/doctor/doctor.module';
import { DoctorService } from 'src/doctor/doctor.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { OverrideSlotInput, RegularSlotInput } from '@org/shared/slots';
import { DoctorBlockedDaysAddInput } from 'src/schedule/input';
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
    ScheduleModule,
    //     UserRolesModule,
    //     ScheduleModule,
    DoctorModule,
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

async function assign_roles(app: INestApplicationContext) {
  const userService = app.get(UserService);
  logger.log('Assigning roles to users...');
  for (const { email, roles } of data.users) {
    logger.log(`Processing user: ${email}`);
    try {
      logger.log(`Finding user: ${email}...`);
      const user = await userService.find_by_email({ email });
      if (!user) {
        logger.warn(`${email} not found`);
        throw new NotFoundException(`${email} not found`);
      }
      await userService.sync_roles({
        email: user?.email,
        roles: roles as RoleType[],
      });
      logger.log(`Updated roles for ${email} to ${roles}`);
    } catch (err) {
      logger.log(`Skipping user: ${email}`);
      logger.error(err.message);
    }
  }
  logger.log(`Role assignment phase complete.`);
}

async function create_doctor_profiles(app: INestApplicationContext) {
  const userService = app.get(UserService);
  const doctorService = app.get(DoctorService);
  logger.log('Creating doctor profiles...');
  for (const profileData of data.doctorProfiles) {
    const { email, academic, experience } = profileData;
    logger.log(`Processing user: ${email}`);
    try {
      const user = await userService.find_by_email({ email });
      if (!user) {
        throw new Error(`User ${email} not found in database.`);
      }
      await doctorService.sync_profile({ email, academic, experience });
      logger.log(`Successfully synced doctor profile for ${email}.`);
    } catch (err) {
      logger.error(`Skipping user ${email}: ${err.message}`);
    }
  }
  logger.log(`Doctor profile creation phase complete.`);
}

async function create_doctor_schedule(app: INestApplicationContext) {
  const scheduleService = app.get(ScheduleService);
  logger.log('Creating doctor schedules...');
  for (const profileData of data.doctorProfiles) {
    await scheduleService.doctor_schedule_sync({
      email: profileData.email,
      minutesPerSlot: profileData.schedule.minutesPerSlot,
      maxBookingDays: profileData.schedule.maxBookingDays,
    });
  }
  logger.log('Doctor schedules phase complete');
}

async function create_doctor_regular_schedules(app: INestApplicationContext) {
  logger.log('Creating regular schedules for doctors...');
  const scheduleService = app.get(ScheduleService);
  const promises = data.doctorProfiles.map(async ({ email, regularSlots }) => {
    try {
      await scheduleService.doctor_regular_routine_sync({
        email,
        slots: regularSlots.map(({ weekDay, shift, startTime, endTime }) => ({
          weekDay,
          shift,
          startTime,
          endTime,
        })) as RegularSlotInput[],
      });
      logger.log(`Synced slots for ${email}`);
    } catch (err) {
      logger.error(`Failed syncing ${email}: ${err.message}`);
    }
  });

  await Promise.all(promises);
  logger.log('Regular slot creation phase done');
}

async function create_doctor_override_schedule(app: INestApplicationContext) {
  logger.log('Creating override for doctors...');
  const scheduleService = app.get(ScheduleService);
  const promises = data.doctorProfiles.map(async ({ email, overrideSlots }) => {
    try {
      await scheduleService.doctor_override_routine_sync({
        email,
        slots: overrideSlots.map(({ date, shift, startTime, endTime }) => ({
          date,
          shift,
          startTime,
          endTime,
        })) as OverrideSlotInput[],
      });
      logger.log(`Synced slots for ${email}`);
    } catch (err) {
      logger.error(`Failed syncing ${email}: ${err.message}`);
    }
  });

  await Promise.all(promises);
  logger.log('Override slot creation phase done');
}

async function add_blockdays_for_doctors(app: INestApplicationContext) {
  logger.log('Adding blockdays for doctors...');
  const scheduleService = app.get(ScheduleService);
  const promises = data.doctorProfiles.map(async ({ email, blockedDays }) => {
    try {
      const dates = blockedDays.map((d) => d.date);
      await scheduleService.doctor_blocked_days_add({
        email,
        dates,
      });
      logger.log(`Synced blocked days for ${email}`);
    } catch (err) {
      logger.error(`Failed syncing ${email}: ${err.message}`);
    }
  });
  await Promise.all(promises);
  logger.log('Blocked day sync phase done');
}

// async function add_doctor_regular_slots(app: INestApplicationContext) {
//   logger.log('Adding regular slots for doctors...');
//   const scheduleService = app.get(ScheduleService);
//   for (const { email, regularSlots } of data.doctorProfiles) {
//     logger.log(`Processing slots for: ${email}`);
//     try {
//       const result = await scheduleService.doctor_regular_routine_sync({
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
  await assign_roles(app);
  await create_doctor_profiles(app);
  await create_doctor_schedule(app);
  await create_doctor_regular_schedules(app);
  await create_doctor_override_schedule(app);
  await add_blockdays_for_doctors(app);
  logger.log('Finished seeding database.');
  await app.close();
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
