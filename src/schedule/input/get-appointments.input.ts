import { InputType } from '@nestjs/graphql';
import { DateField } from '@org/shared/date';
import { AppointmentStatusField, UuidField } from '@org/shared/fields';

@InputType()
export class GetAppointmentsInput {
  @UuidField({ nullable: true })
  scheduleUuid?: string;

  @UuidField({ nullable: true })
  patientUuid?: string;

  @AppointmentStatusField({ nullable: true })
  status?: string;

  @DateField({ nullable: true })
  date?: string;
}
