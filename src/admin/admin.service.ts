import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  KyselyDatabaseService,
  Department,
  User,
  RoleType,
} from '@org/shared/db';
import { AddDepartmentInput, FindDepartmentInput } from './input';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
  ) {}

  async admin_dashboard() {
    const today = new Date();

    const [activeDoctors, scheduledAppointments, completedAppointmentsToday] =
      await Promise.all([
        this._db
          .selectFrom('doctor_profile')
          .select((eb) => eb.fn.countAll().as('count'))
          .executeTakeFirst(),

        this._db
          .selectFrom('appointment')
          .select((eb) => eb.fn.countAll().as('count'))
          .where('status', '=', 'SCHEDULED')
          .executeTakeFirst(),

        this._db
          .selectFrom('appointment')
          .select((eb) => eb.fn.countAll().as('count'))
          .where('status', '=', 'COMPLETED')
          .where('date', '=', today as any)
          .executeTakeFirst(),
      ]);

    return {
      count_active_doctors: Number(activeDoctors?.count ?? 0),
      count_scheduled_appointments: Number(scheduledAppointments?.count ?? 0),
      count_completed_appointments_today: Number(
        completedAppointmentsToday?.count ?? 0,
      ),
    };
  }

  async get_all_users() {
    const users = await this._db
      .selectFrom('user_account')
      .selectAll()
      .execute();

    return await Promise.all(
      users.map(async (user) => {
        const roles = await this._db
          .selectFrom('user_role')
          .select('role')
          .where('user_id', '=', user.id)
          .execute();
        return {
          ...user,
          roles: roles.map((r) => r.role),
        };
      }),
    );
  }

  async assign_doctor_department(
    doctorUuid: string,
    departmentUuid: string | null,
  ) {
    const user = await this._db
      .selectFrom('user_account')
      .selectAll()
      .where('uuid', '=', doctorUuid)
      .executeTakeFirst();
    if (!user) throw new NotFoundException(`User ${doctorUuid} not found`);

    const department_id = departmentUuid
      ? ((
          await this._db
            .selectFrom('department')
            .select('id')
            .where('uuid', '=', departmentUuid)
            .executeTakeFirst()
        )?.id ?? null)
      : null;

    const existing = await this._db
      .selectFrom('doctor_profile')
      .select('id')
      .where('user_id', '=', user.id)
      .executeTakeFirst();

    if (existing) {
      await this._db
        .updateTable('doctor_profile')
        .set({ department_id })
        .where('user_id', '=', user.id)
        .execute();
    } else {
      await this._db
        .insertInto('doctor_profile')
        .values({ user_id: user.id, department_id })
        .execute();
    }
    return true;
  }

  async get_all_doctors() {
    return await this._db
      .selectFrom('user_account')
      .innerJoin('user_role', 'user_role.user_id', 'user_account.id')
      .leftJoin('doctor_profile', 'doctor_profile.user_id', 'user_account.id')
      .leftJoin('department', 'department.id', 'doctor_profile.department_id')
      .select([
        'user_account.uuid',
        'user_account.name',
        'user_account.email',
        'department.uuid as department_uuid',
        'department.name as department_name',
      ])
      .where('user_role.role', '=', RoleType.DOCTOR)
      .execute();
  }
}
