import { Field, ObjectType } from '@nestjs/graphql';
import { IntegerField } from '@org/shared/fields';
import { AppointmentOutput } from 'src/schedule/output';

@ObjectType()
export class MyDoctorProfileOutput {
  @IntegerField()
  today_appointment_count: number;

  @IntegerField()
  total_patients: number;

  @IntegerField()
  completed_consultations: number;

  @Field(() => [AppointmentOutput])
  today_appointments: AppointmentOutput[];
}
