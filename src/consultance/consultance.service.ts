import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AppointmentStatusType,
  Complaint,
  KyselyDatabaseService,
} from '@org/shared/db';
import { UserService } from 'src/user';
import { AddComplaintInput } from './input/add-complaint.input';
import { AddAppointmentComplaintInput } from './input';
import { ScheduleService } from 'src/schedule/schedule.service';

@Injectable()
export class ConsultanceService {
  private readonly _logger = new Logger(ConsultanceService.name);

  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(ScheduleService) private readonly _scheduleService: ScheduleService,
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

  async add_appointment_complaint({
    appointment_uuid,
    complaint_uuid,
    note,
    days,
  }: AddAppointmentComplaintInput): Promise<boolean> {
    // get appointment
    const appointment =
      await this._scheduleService.get_appointment_from_uuid(appointment_uuid);
    if (!appointment) {
      this._logger.error(`Appointment "${appointment_uuid}" not found.`);
      return false;
    }
    const appointment_id = appointment.id;

    // get complaint
    const complaint = await this._get_complaint_from_uuid(complaint_uuid);
    if (!complaint) {
      this._logger.error(`Complaint "${complaint_uuid}" not found.`);
      return false;
    }
    const complaint_id = complaint.id;

    // try insertion
    try {
      await this._db
        .insertInto('appointment_complaint')
        .values({
          appointment_id,
          complaint_id,
          note,
          days,
        })
        .execute();
      return true;
    } catch (err) {
      this._logger.error(err.msg);
      return false;
    }
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

  async get_appointment_complaints(
    appointment_uuid: string,
  ): Promise<Complaint[]> {
    this._logger.log(
      `Fetching complaints from appointment "${appointment_uuid}"`,
    );
    const appointment = await this._get_appointment_from_uuid(appointment_uuid);
    if (!appointment) {
      this._logger.error(`Appointment "${appointment_uuid}" not found.`);
      return [];
    }
    try {
      return await this._db
        .selectFrom('appointment_complaint')
        .innerJoin(
          'complaint',
          'complaint.id',
          'appointment_complaint.complaint_id',
        )
        .select([
          'complaint.id',
          'complaint.uuid',
          'complaint.name',
          'appointment_complaint.note',
          'appointment_complaint.days',
        ])
        .where('appointment_complaint.appointment_id', '=', appointment.id)
        .execute();
    } catch (err) {
      this._logger.error(err.msg);
      return [];
    }
  }

  /**
   * Private utilities
   */
  private async _get_complaint_from_uuid(uuid: string) {
    return await this._db
      .selectFrom('complaint')
      .selectAll()
      .where('uuid', '=', uuid)
      .executeTakeFirst();
  }

  private async _get_appointment_from_uuid(uuid: string) {
    return await this._db
      .selectFrom('appointment')
      .selectAll()
      .where('uuid', '=', uuid)
      .executeTakeFirst();
  }
}
