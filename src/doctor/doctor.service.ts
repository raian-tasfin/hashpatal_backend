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
} from '@org/shared/db';
import { UserService } from 'src/user/user.service';
import { UpdateProfileInput } from './input';

@Injectable()
export class DoctorService {
  private readonly logger = new Logger(DoctorService.name);

  constructor(
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async sync_profile(data: UpdateProfileInput) {
    const { email, academic, experience } = data;
    this.logger.log(`Syncing doctor profile for user: ${email}`);
    try {
      this.logger.log(`Finding user ${email}`);
      const user = await this.userService.find_by_email({ email });
      if (!user) {
        const msg = `User with email ${email} not found`;
        this.logger.warn(msg);
        throw new NotFoundException(msg);
      }
      this.logger.log(`Fetching user roles ${email}.`);
      const roles = await this.userService._find_roles(user.id);
      const isDoctor = roles.some((r) => r === RoleType.DOCTOR);
      if (!isDoctor) {
        const msg = `User ${email} does not have role DOCTOR`;
        this.logger.warn(msg);
        throw new ForbiddenException(msg);
      }
      await this._db.transaction().execute(async (trx) => {
        await trx
          .deleteFrom('doctor_profile')
          .where('doctor_profile.userId', '=', user.id)
          .execute();
        const res = await trx
          .insertInto('doctor_profile')
          .values({ userId: user.id })
          .returning('id')
          .execute();
        const doctorProfileId = res[0].id;
        await trx
          .insertInto('academic_record')
          .values(
            academic.map(({ degree, institute, year }) => ({
              doctorProfileId,
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
                doctorProfileId,
                title,
                organization,
                location,
                startYear: new Date(`${startYear}-01-01`),
                endYear: endYear ? new Date(`${endYear}-01-01`) : null,
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
      .where('userId', '=', userId)
      .executeTakeFirst();
  }

  async get_experience(doctorProfileId: number): Promise<DoctorExperience[]> {
    return await this._db
      .selectFrom('doctor_experience')
      .selectAll()
      .where('doctorProfileId', '=', doctorProfileId)
      .execute();
  }

  async get_academic_record(
    doctorProfileId: number,
  ): Promise<AcademicRecord[]> {
    return await this._db
      .selectFrom('academic_record')
      .selectAll()
      .where('doctorProfileId', '=', doctorProfileId)
      .execute();
  }
}
