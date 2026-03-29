import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AppointmentStatusType,
  Complaint,
  KyselyDatabaseService,
} from '@org/shared/db';
import { UserService } from 'src/user';
import { AddComplaintInput } from './input/add-complaint.input';

@Injectable()
export class ConsultanceService {
  private readonly _logger = new Logger(ConsultanceService.name);

  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
  ) {}

  /**
   * Public Mutations
   */
  async add_complaint({ name }: AddComplaintInput): Promise<boolean> {
    this._logger.log(`Adding complaint'${name}'`);
    await this._db
      .insertInto('complaint')
      .values({ name })
      .onConflict((x) => x.doNothing())
      .execute();
    return true;
  }

  /**
   * Public Queries
   */
  async patient(patient_id: number) {
    return await this._userService._get_user_by_id(patient_id);
  }

  async previous_appointments(patient_id: number) {
    try {
      return await this._db
        .selectFrom('appointment')
        .selectAll()
        .where('patient_id', '=', patient_id)
        .where('status', '=', AppointmentStatusType.COMPLETED)
        .execute();
    } catch (err) {
      this._logger.error(err.msg);
      return [];
    }
  }

  async get_all_complaints(): Promise<Complaint[]> {
    this._logger.log(`Fetching all complaints.`);
    return await this._db.selectFrom('complaint').selectAll().execute();
  }
}
