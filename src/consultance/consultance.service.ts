import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AppointmentStatusType,
  Complaint,
  Diagnosis,
  DurationUnitType,
  FoodRelationType,
  KyselyDatabaseService,
  Medication,
  MedicationFrequencyType,
} from '@org/shared/db';
import { UserService } from 'src/user';
import { AddComplaintInput } from './input/add-complaint.input';
import {
  AddAppointmentComplaintInput,
  AddDiagnosisInput,
  AddAppointmentDiagnosisInput,
  AddMedicationInput,
  AddPrescriptionItemInput,
  SetAppointmentStatusInput,
} from './input';
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

  async add_diagnosis({ name }: AddDiagnosisInput): Promise<boolean> {
    this._logger.log(`Adding diagnosis '${name}'`);
    await this._db
      .insertInto('diagnosis')
      .values({ name })
      .onConflict((x) => x.doNothing())
      .execute();
    return true;
  }

  async add_appointment_diagnosis({
    appointment_uuid,
    diagnosis_uuid,
  }: AddAppointmentDiagnosisInput): Promise<boolean> {
    // get appointment
    const appointment =
      await this._scheduleService.get_appointment_from_uuid(appointment_uuid);
    if (!appointment) {
      this._logger.error(`Appointment "${appointment_uuid}" not found.`);
      return false;
    }
    const appointment_id = appointment.id;

    // get diagnosis
    const diagnosis = await this._get_diagnosis_from_uuid(diagnosis_uuid);
    if (!diagnosis) {
      this._logger.error(`Diagnosis "${diagnosis_uuid}" not found.`);
      return false;
    }
    const diagnosis_id = diagnosis.id;

    // try insertion
    try {
      await this._db
        .insertInto('appointment_diagnosis')
        .values({
          appointment_id,
          diagnosis_id,
        })
        .execute();
      return true;
    } catch (err) {
      this._logger.error(err.msg);
      return false;
    }
  }

  async add_medication({
    name,
    generic_name,
    dose_unit,
    food_relation: f,
  }: AddMedicationInput): Promise<boolean> {
    this._logger.log(`Adding medication'${name}'`);
    const food_relation = f as FoodRelationType;
    await this._db
      .insertInto('medication')
      .values({ name, generic_name, dose_unit, food_relation })
      .onConflict((x) => x.doNothing())
      .execute();
    return true;
  }

  async add_prescription_item({
    appointment_uuid,
    medication_uuid,
    dose_quantity,
    frequency,
    duration_value,
    duration_unit,
  }: AddPrescriptionItemInput): Promise<boolean> {
    // get appointment
    const appointment =
      await this._scheduleService.get_appointment_from_uuid(appointment_uuid);
    if (!appointment) {
      this._logger.error(`Appointment "${appointment_uuid}" not found.`);
      return false;
    }
    const appointment_id = appointment.id;

    // get medication
    const medication = await this._get_medication_from_uuid(medication_uuid);
    if (!medication) {
      this._logger.error(`Medication "${medication_uuid}" not found.`);
      return false;
    }
    const medication_id = medication.id;

    // try insertion
    try {
      await this._db
        .insertInto('prescription_item')
        .values({
          appointment_id,
          medication_id,
          dose_quantity,
          frequency: frequency as MedicationFrequencyType,
          duration_value,
          duration_unit: duration_unit as DurationUnitType,
        })
        .execute();
      return true;
    } catch (err) {
      this._logger.error(err.msg);
      return false;
    }
  }

  async set_appointment_status({
    uuid,
    status,
  }: SetAppointmentStatusInput): Promise<boolean> {
    try {
      await this._db
        .updateTable('appointment')
        .set({ status: status as AppointmentStatusType })
        .where('uuid', '=', uuid)
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

  async get_all_diagnosis(): Promise<Complaint[]> {
    this._logger.log(`Fetching all diagnosis.`);
    return await this._db.selectFrom('diagnosis').selectAll().execute();
  }

  async get_appointment_diagnosis(
    appointment_uuid: string,
  ): Promise<Diagnosis[]> {
    this._logger.log(
      `Fetching diagnosis from appointment "${appointment_uuid}"`,
    );
    const appointment = await this._get_appointment_from_uuid(appointment_uuid);
    if (!appointment) {
      this._logger.error(`Appointment "${appointment_uuid}" not found.`);
      return [];
    }
    try {
      return await this._db
        .selectFrom('appointment_diagnosis')
        .innerJoin(
          'diagnosis',
          'diagnosis.id',
          'appointment_diagnosis.diagnosis_id',
        )
        .select(['diagnosis.id', 'diagnosis.uuid', 'diagnosis.name'])
        .where('appointment_diagnosis.appointment_id', '=', appointment.id)
        .execute();
    } catch (err) {
      this._logger.error(err.msg);
      return [];
    }
  }

  async get_all_medication(): Promise<Medication[]> {
    this._logger.log(`Fetching all medications.`);
    return await this._db.selectFrom('medication').selectAll().execute();
  }

  async get_appointment_prescription_items(appointment_uuid: string) {
    this._logger.log(
      `Fetching medications from appointment "${appointment_uuid}"`,
    );
    const appointment = await this._get_appointment_from_uuid(appointment_uuid);
    if (!appointment) {
      this._logger.error(`Appointment "${appointment_uuid}" not found.`);
      return [];
    }
    try {
      return await this._db
        .selectFrom('prescription_item')
        .innerJoin(
          'medication',
          'medication.id',
          'prescription_item.medication_id',
        )
        .select([
          'prescription_item.id',
          'prescription_item.appointment_id',
          'medication.uuid as medication_uuid',
          'medication.name as medication_name',
          'prescription_item.dose_quantity',
          'prescription_item.frequency',
          'prescription_item.duration_value',
          'prescription_item.duration_unit',
        ])
        .where('prescription_item.appointment_id', '=', appointment.id)
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

  private async _get_diagnosis_from_uuid(uuid: string) {
    return await this._db
      .selectFrom('diagnosis')
      .selectAll()
      .where('uuid', '=', uuid)
      .executeTakeFirst();
  }

  private async _get_medication_from_uuid(uuid: string) {
    return await this._db
      .selectFrom('medication')
      .selectAll()
      .where('uuid', '=', uuid)
      .executeTakeFirst();
  }
}
