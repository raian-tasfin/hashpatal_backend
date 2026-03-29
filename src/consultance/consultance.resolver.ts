import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AppointmentOutput } from 'src/schedule/output';
import {
  ComplaintOutput,
  PatientOutput,
  PreviousAppointmentOutput,
} from './output';
import { ConsultanceService } from './consultance.service';
import {
  AddAppointmentComplaintInput,
  AddAppointmentDiagnosisInput,
  AddComplaintInput,
} from './input';
import { DiagnosisOutput } from './output/diagnosis.output';

@Resolver(() => AppointmentOutput)
export class AppointmentResolver {
  constructor(private readonly _consultanceService: ConsultanceService) {}

  /**
   * Queries
   */
  @ResolveField(() => PatientOutput, { nullable: true })
  async patient(
    @Parent() appointment: AppointmentOutput,
  ): Promise<PatientOutput | null> {
    const patient = await this._consultanceService.patient(
      appointment.patient_id,
    );
    return patient ? PatientOutput.from_model(patient) : null;
  }

  @ResolveField(() => [ComplaintOutput], { nullable: true })
  async complaints(
    @Parent() appointment: AppointmentOutput,
  ): Promise<ComplaintOutput[]> {
    const records = await this._consultanceService.get_appointment_complaints(
      appointment.uuid,
    );
    return records.map(ComplaintOutput.from_model);
  }

  @ResolveField(() => [DiagnosisOutput], { nullable: true })
  async diagnosis(
    @Parent() appointment: AppointmentOutput,
  ): Promise<DiagnosisOutput[]> {
    const records = await this._consultanceService.get_appointment_diagnosis(
      appointment.uuid,
    );
    return records.map(DiagnosisOutput.from_model);
  }
}

@Resolver(() => PatientOutput)
export class PatientResolver {
  constructor(private readonly _consultanceService: ConsultanceService) {}

  /**
   * Queries
   */
  @ResolveField(() => [PreviousAppointmentOutput], { nullable: true })
  async previous_appointments(
    @Parent() patient: PatientOutput,
  ): Promise<PreviousAppointmentOutput[]> {
    const records = await this._consultanceService.previous_appointments(
      patient.id,
    );
    return records.map(PreviousAppointmentOutput.from_model);
  }
}

@Resolver()
export class ConsultanceResolver {
  constructor(private readonly _consultanceService: ConsultanceService) {}

  /**
   * Mutations
   */
  @Mutation(() => Boolean)
  async add_complaint(@Args('data') data: AddComplaintInput): Promise<boolean> {
    return await this._consultanceService.add_complaint(data);
  }

  @Mutation(() => Boolean)
  async add_appointment_complaint(
    @Args('data') data: AddAppointmentComplaintInput,
  ): Promise<boolean> {
    return await this._consultanceService.add_appointment_complaint(data);
  }

  @Mutation(() => Boolean)
  async add_appointment_diagnosis(
    @Args('data') data: AddAppointmentDiagnosisInput,
  ): Promise<boolean> {
    return await this._consultanceService.add_appointment_diagnosis(data);
  }

  /**
   * Queries
   */
  @Query(() => [ComplaintOutput])
  async get_all_complaints(): Promise<ComplaintOutput[]> {
    const records = await this._consultanceService.get_all_complaints();
    return records.map(ComplaintOutput.from_model);
  }

  @Query(() => [DiagnosisOutput])
  async get_all_diagnosis(): Promise<DiagnosisOutput[]> {
    const records = await this._consultanceService.get_all_diagnosis();
    return records.map(DiagnosisOutput.from_model);
  }
}
