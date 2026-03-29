import { InputType } from '@nestjs/graphql';
import { IntegerField, StringField, UuidField } from '@org/shared/fields';

@InputType()
export class AddAppointmentComplaintInput {
  @UuidField()
  appointment_uuid: string;

  @UuidField()
  complaint_uuid: string;

  @StringField({ nullable: true })
  note?: string;

  @IntegerField({ nullable: true })
  days?: number;
}
