import { InputType } from '@nestjs/graphql';
import { AppointmentStatusField, UuidField } from '@org/shared/fields';

@InputType()
export class SetAppointmentStatusInput {
  @UuidField()
  uuid: string;

  @AppointmentStatusField()
  status: string;
}
