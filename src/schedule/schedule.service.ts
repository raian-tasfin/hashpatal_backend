import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DoctorScheduleSyncInput } from './input';
import { UserService } from 'src/user';
import { DoctorService } from 'src/doctor/doctor.service';
import {
  KyselyDatabaseService,
  RoleType,
  Schedulable,
  SchedulableType,
} from '@org/shared/db';
import { SchedulableOutput } from './output/schedulable.output';

@Injectable()
export class ScheduleSercvice {
  private readonly _logger = new Logger(ScheduleSercvice.name);

  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(DoctorService) private readonly doctorService: DoctorService,
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
  ) {}

  /**
   * Mutations
   */
  async doctor_schedule_sync(data: DoctorScheduleSyncInput): Promise<boolean> {
    const { email, minutesPerSlot } = data;
    const user = await this.userService.find_by_email({ email });
    if (!user) throw new NotFoundException(`User "${email}" not found`);
    const roles = await this.userService._find_roles(user.id);
    if (!roles.includes(RoleType.DOCTOR)) {
      throw new UnauthorizedException(`"${email}" not DOCTOR.`);
    }
    const doctor = await this.doctorService.get_profile(user.id);
    if (!doctor) {
      throw new NotFoundException(`Doctor "${email}"'s profile not found`);
    }
    await this._db.transaction().execute(async (trx) => {
      if (doctor.schedulableId) {
        await trx
          .deleteFrom('schedulable')
          .where('id', '=', doctor.schedulableId)
          .execute();
      }
      const { id } = await trx
        .insertInto('schedulable')
        .values({
          entityId: doctor.id,
          minutesPerSlot: minutesPerSlot,
          type: SchedulableType.DOCTOR,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await trx
        .updateTable('doctor_profile')
        .set({ schedulableId: id })
        .where('id', '=', doctor.id)
        .execute();
    });
    return true;
  }

  async get_doctor_schedule(
    doctorProfileId: number,
  ): Promise<Schedulable | undefined> {
    return await this._db
      .selectFrom('schedulable')
      .selectAll()
      .where('entityId', '=', doctorProfileId)
      .where('type', '=', SchedulableType.DOCTOR)
      .executeTakeFirst();
  }
}
