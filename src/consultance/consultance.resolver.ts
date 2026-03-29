import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AppointmentOutput } from 'src/schedule/output';
import { PatientOutput, PreviousAppointmentOutput } from './output';
import { ConsultanceService } from './consultance.service';

@Resolver(() => AppointmentOutput)
export class AppointmentResolver {
  constructor(private readonly _consultanceService: ConsultanceService) {}

  @ResolveField(() => PatientOutput, { nullable: true })
  async patient(
    @Parent() appointment: AppointmentOutput,
  ): Promise<PatientOutput | null> {
    const patient = await this._consultanceService.patient(
      appointment.patient_id,
    );
    return patient ? PatientOutput.from_model(patient) : null;
  }
}

@Resolver(() => PatientOutput)
export class PatientResolver {
  constructor(private readonly _consultanceService: ConsultanceService) {}

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
