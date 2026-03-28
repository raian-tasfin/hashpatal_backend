import {
  Inject,
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  AcademicRecord,
  DoctorExperience,
  DoctorProfile,
  KyselyDatabaseService,
  RoleType,
  User,
} from '@org/shared/db';
import { UserService } from 'src/user/user.service';
import { SyncProfileInput } from './input';
import { DepartmentService } from 'src/department/department.service';

@Injectable()
export class DoctorService {
  private readonly logger = new Logger(DoctorService.name);

  constructor(
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(DepartmentService)
    private readonly _departmentService: DepartmentService,
  ) {}

  async sync_profile(data: SyncProfileInput) {
    const { uuid, departmentUuid, experience, academic } = data;
    this.logger.log(`Syncing doctor profile for user: ${uuid}`);
    try {
      this.logger.log(`Finding user ${uuid}`);
      const user = await this._userService.find({ uuid });
      if (!user) {
        const msg = `User with UUID ${uuid} not found`;
        this.logger.warn(msg);
        throw new NotFoundException(msg);
      }

      const get_department_id = async (uuid: string | undefined | null) => {
        if (!uuid) return null;
        this.logger.log(`Finding department '${uuid}'`);
        const department = await this._departmentService.find({ uuid });
        if (!department) {
          const msg = `Department with UUID ${departmentUuid} not found`;
          this.logger.warn(msg);
          return null;
        }
        return department.id;
      };
      const department_id = await get_department_id(departmentUuid);

      this.logger.log(`Fetching user roles ${uuid}.`);
      const roles = await this._userService._find_roles(user.id);
      const isDoctor = roles.some((r) => r === RoleType.DOCTOR);
      if (!isDoctor) {
        const msg = `User ${uuid} does not have role DOCTOR`;
        this.logger.warn(msg);
        throw new ForbiddenException(msg);
      }

      await this._db.transaction().execute(async (trx) => {
        await trx
          .deleteFrom('doctor_profile')
          .where('doctor_profile.user_id', '=', user.id)
          .execute();
        const res = await trx
          .insertInto('doctor_profile')
          .values({ user_id: user.id, department_id })
          .returning('id')
          .execute();
        const doctor_profile_id = res[0].id;
        await trx
          .insertInto('academic_record')
          .values(
            academic.map(({ degree, institute, year }) => ({
              doctor_profile_id,
              degree,
              institute,
              year: new Date(`${year}-01-01`),
            })),
          )
          .execute();
        await trx
          .insertInto('doctor_experience')
          .values(
            experience.map(
              ({ title, organization, location, startYear, endYear }) => ({
                doctor_profile_id,
                title,
                organization,
                location,
                start_year: new Date(`${startYear}-01-01`),
                end_year: endYear ? new Date(`${endYear}-01-01`) : null,
              }),
            ),
          )
          .execute();
      });
    } catch (err) {
      if (
        err instanceof ForbiddenException ||
        err instanceof NotFoundException
      ) {
        throw err;
      }
      this.logger.error(`Failed to sync doctor profile: ${err.message}`);
      throw new InternalServerErrorException('Could not sync doctor profile');
    }
  }

  async get_profile(userId: number): Promise<DoctorProfile | undefined> {
    return await this._db
      .selectFrom('doctor_profile')
      .selectAll()
      .where('user_id', '=', userId)
      .executeTakeFirst();
  }

  async get_experience(doctorProfileId: number): Promise<DoctorExperience[]> {
    return await this._db
      .selectFrom('doctor_experience')
      .selectAll()
      .where('doctor_profile_id', '=', doctorProfileId)
      .execute();
  }

  async get_academic_record(
    doctorProfileId: number,
  ): Promise<AcademicRecord[]> {
    return await this._db
      .selectFrom('academic_record')
      .selectAll()
      .where('doctor_profile_id', '=', doctorProfileId)
      .execute();
  }
}
