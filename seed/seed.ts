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
import { DatabaseModule, SchedulableType, ShiftType } from '@org/shared/db';
// import { UserRolesModule } from 'src/user-roles/user-roles.module';
// import { UserRolesService } from 'src/user-roles/user-roles.service';
import { RoleType } from '@org/shared/db';
import { DoctorModule } from 'src/doctor/doctor.module';
// import { DoctorService } from 'src/doctor/doctor.service'; // import { ScheduleService } from 'src/schedule/schedule.service';
// import { ScheduleModule } from 'src/schedule/schedule.module';
import { DepartmentModule } from 'src/department/department.module';
import { ConsultanceModule } from 'src/consultance/consultance.module';
import { ConsultanceService } from 'src/consultance/consultance.service';
// import { DoctorModule } from 'src/doctor/doctor.module';
// import { ScheduleService } from 'src/schedule/schedule.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { DepartmentService } from 'src/department/department.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { RoutineSlotInput } from '@org/shared/slots';
// import { doctorProfile } from '@org/shared/db/schema';

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
    //     ScheduleModule,
    //     UserRolesModule,
    ScheduleModule,
    DoctorModule,
    DepartmentModule,
    ConsultanceModule,
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
      const user = await userService.find({ email });
      if (!user) {
        logger.warn(`${email} not found`);
        throw new NotFoundException(`${email} not found`);
      }
      await userService.sync_roles({
        uuid: user?.uuid,
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

async function add_departments(app: INestApplicationContext) {
  const departmentService = app.get(DepartmentService);
  logger.log('Adding departments...');
  for (const { name } of data.departments) {
    logger.log(`Adding department: ${name}`);
    try {
      const res = await departmentService.add({ name });
      if (!res) throw Error(`Failed adding department "${name}"`);
    } catch (err) {
      logger.log(`Skipping department: "${name}"`);
      logger.error(err.message);
    }
  }
  logger.log(`Department population phase complete.`);
}

async function add_complaints(app: INestApplicationContext) {
  const consultanceService = app.get(ConsultanceService);
  logger.log('Adding chief complaints...');
  for (const name of data.chief_complaints) {
    logger.log(`Adding complaint: ${name}`);
    try {
      const res = await consultanceService.add_complaint({ name });
      if (!res) throw Error(`Failed adding complaint "${name}"`);
    } catch (err) {
      logger.log(`Skipping complaint: "${name}"`);
      logger.error(err.message);
    }
  }
  logger.log(`Complaint population phase complete.`);
}

/**
 * Just create an entry with user_id, department_id, experience, academic.
 */
type DoctorProfileSeedData = (typeof data.doctorProfiles)[number];
async function _create_doctor_profile(
  profile: DoctorProfileSeedData,
  app: INestApplicationContext,
) {
  logger.log(`Creating profile for doctor "${profile.email}"`);
  const userService = app.get(UserService);
  const departmentService = app.get(DepartmentService);
  const doctorService = app.get(DoctorService);

  const user = await userService.find({ email: profile.email });
  if (!user) {
    logger.warn(
      `Skipping profile creation for doctor "${profile.email}". User not found.`,
    );
    return;
  }
  const department = await departmentService.find_by_name({
    name: profile.department_name,
  });
  if (!department) {
    logger.warn(
      `Skipping profile creation for doctor "${profile.email}". Department "${profile.department_name}" not found.`,
    );
    return;
  }

  try {
    await doctorService.sync_profile({
      uuid: user.uuid,
      departmentUuid: department.uuid,
      experience: profile.experience,
      academic: profile.academic,
    });
  } catch (err) {
    logger.warn(`Skipping profile creation for doctor "${profile.email}".`);
    logger.error(err.msg);
    return;
  }
  logger.log(`Profile created for doctor "${profile.email}".`);
}

/**
 * Create schedule for profile
 */
async function _create_doctor_schedules(
  profile: DoctorProfileSeedData,
  app: INestApplicationContext,
) {
  const scheduleService = app.get(ScheduleService);
  const userService = app.get(UserService);
  logger.log(`Creating schedule for doctor "${profile.email}"`);
  const user = await userService.find({ email: profile.email });
  if (!user) {
    logger.warn(`Skipping doctor "${profile.email}"`);
    return;
  }
  await scheduleService.schedule_sync({
    entityUuid: user.uuid,
    schedulable: SchedulableType.DOCTOR,
    minutes_per_slot: profile.schedule.minutesPerSlot,
    max_booking_days: profile.schedule.maxBookingDays,
  });
  logger.log(`Created schedule for doctor "${profile.email}"`);
}

/**
 * Create routine for profile
 */
async function _create_doctor_routine(
  profile: DoctorProfileSeedData,
  app: INestApplicationContext,
) {
  const logger = new Logger('Seed');
  logger.log(`Creating routine for "${profile.email}"`);

  const scheduleService = app.get(ScheduleService);
  const userService = app.get(UserService);

  const user = await userService.find({ email: profile.email });
  if (!user) {
    logger.warn(`Skipping doctor "${profile.email}": User not found.`);
    return;
  }
  const entityUuid = user.uuid;
  const schedulable = SchedulableType.DOCTOR;
  try {
    await scheduleService.routine_sync({
      entityUuid,
      schedulable,
      slots: profile.routine.map((slot, index) => ({
        ...slot,
      })) as RoutineSlotInput[],
    });
  } catch (error) {
    logger.error(
      `Error syncing routine for "${profile.email}": "${error.message}"`,
    );
  }
}

/**
 * Process all profiles one by one
 */
async function create_doctor_profiles(app: INestApplicationContext) {
  logger.log(`Creating doctor profiles.`);
  for (const doctorProfile of data.doctorProfiles) {
    await _create_doctor_profile(doctorProfile, app);
    await _create_doctor_schedules(doctorProfile, app);
    await _create_doctor_routine(doctorProfile, app);
    await _create_doctor_schedules(doctorProfile, app);
  }
  logger.log(`Doctor profiles created.`);
}

/**
 * Create one appointment on April 1
 */
async function make_appointment(app: INestApplicationContext) {
  logger.log(`Making appointments in April 1.`);

  const userService = app.get(UserService);
  const scheduleService = app.get(ScheduleService);
  const doctorService = app.get(DoctorService);

  // get patient
  const patientEmail = 'patient@mail.com';
  const patient = await userService.find({ email: patientEmail });
  if (!patient) {
    logger.error(`NO account for patient "${patientEmail}"`);
    return;
  }

  // get schedule uuid.
  // doctor
  const doctorEmail = 'doctor@mail.com';
  const doctor = await userService.find({ email: doctorEmail });
  if (!doctor) {
    logger.error(`NO account for doctor "${doctorEmail}"`);
    return;
  }
  // doctor profile
  const doctorProfile = await doctorService.get_profile(doctor.id);
  if (!doctorProfile) {
    logger.error(`No profile for ${doctorEmail}`);
    return;
  }
  if (!doctorProfile.scheduleId) {
    logger.error(`No schedule for ${doctorEmail}`);
    return;
  }
  // schedule
  const schedule = await scheduleService.get_schedule_from_id(
    doctorProfile.scheduleId,
  );
  if (!schedule) {
    logger.error(`No schedule for ${doctorEmail}`);
    return;
  }

  // make appointment
  while (
    await scheduleService.make_appointment({
      scheduleUuid: schedule.uuid,
      patientUuid: patient.uuid,
      date: '2026-04-01',
      shift: ShiftType.MORNING,
    })
  ) {}
  logger.log(`Appointments created.`);
}

// async function create_doctor_profiles(app: INestApplicationContext) {
//   const userService = app.get(UserService);
//   const doctorService = app.get(DoctorService);
//   const departmentService = app.get(DepartmentService);
//   logger.log('Creating doctor profiles...');
//
//   const department_uuid = async (name: string) => {
//     const res = await departmentService.find_by_name({ name });
//     if (!res) return res;
//     return res.uuid;
//   };
//   for (const profileData of data.doctorProfiles) {
//     const { email, academic, experience, department_name } = profileData;
//     logger.log(`Processing user: ${email}`);
//     try {
//       const user = await userService.find({ email });
//       if (!user) {
//         throw new Error(`User ${email} not found in database.`);
//       }
//       const departmentUuid = await department_uuid(department_name);
//       await doctorService.sync_profile({
//         uuid: user.uuid,
//         academic,
//         experience,
//         departmentUuid,
//       });
//       logger.log(`Successfully synced doctor profile for ${email}.`);
//     } catch (err) {
//       logger.error(`Skipping user ${email}: ${err.message}`);
//     }
//   }
//   logger.log(`Doctor profile creation phase complete.`);
// }
//

// async function create_doctor_profiles(app: INestApplicationContext) {
//   for (doctorProfile of data.doctorProfiles) {
//   }
// }

// async function create_doctor_override_schedule(app: INestApplicationContext) {
//   logger.log('Creating override for doctors...');
//   const scheduleService = app.get(ScheduleService);
//   const promises = data.doctorProfiles.map(async ({ email, overrideSlots }) => {
//     try {
//       await scheduleService.doctor_override_routine_sync({
//         email,
//         slots: overrideSlots.map(({ date, shift, startTime, endTime }) => ({
//           date,
//           shift,
//           startTime,
//           endTime,
//         })) as OverrideSlotInput[],
//       });
//       logger.log(`Synced slots for ${email}`);
//     } catch (err) {
//       logger.error(`Failed syncing ${email}: ${err.message}`);
//     }
//   });
//
//   await Promise.all(promises);
//   logger.log('Override slot creation phase done');
// }
//
// async function add_blockdays_for_doctors(app: INestApplicationContext) {
//   logger.log('Adding blockdays for doctors...');
//   const scheduleService = app.get(ScheduleService); //   const promises = data.doctorProfiles.map(async ({ email, blockedDays }) => {
//     try {
//       const dates = blockedDays.map((d) => d.date);
//       await scheduleService.doctor_blocked_days_add({
//         email,
//         dates,
//       });
//       logger.log(`Synced blocked days for ${email}`);
//     } catch (err) {
//       logger.error(`Failed syncing ${email}: ${err.message}`);
//     }
//   });
//   await Promise.all(promises);
//   logger.log('Blocked day sync phase done');
// }
//
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
  await add_departments(app);
  await create_doctor_profiles(app);
  await make_appointment(app);

  await add_complaints(app);

  //   await create_doctor_schedules(app);
  //   await create_doctor_routines(app);
  // await create_doctor_regular_schedules(app);
  // await create_doctor_override_schedule(app);
  // await add_blockdays_for_doctors(app);
  logger.log('Finished seeding database.');
  await app.close();
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
