import { InputType } from '@nestjs/graphql';
import { DateField } from '@org/shared/date';
import { ShiftField, UuidField } from '@org/shared/fields';

@InputType()
export class MakeAppointmentInput {
  // schedule
  @UuidField()
  scheduleUuid: string;

  // patient
  @UuidField()
  patientUuid: string;

  // shift
  @DateField()
  date: string;

  @ShiftField()
  shift: string;
}
