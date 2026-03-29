import { InputType } from '@nestjs/graphql';
import { UuidField } from '@org/shared/fields';

@InputType()
export class AddAppointmentDiagnosisInput {
  @UuidField()
  appointment_uuid: string;

  @UuidField()
  diagnosis_uuid: string;
}
