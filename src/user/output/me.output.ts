import { Field, ObjectType } from '@nestjs/graphql';
import { UserOutput } from './user.output';
import { IntegerField } from '@org/shared/fields';
import { AppointmentOutput } from 'src/schedule/output';

@ObjectType()
export class MeOutput {
  @Field(() => UserOutput)
  user: UserOutput;

  @IntegerField()
  upcoming_appointments: number;

  @IntegerField()
  past_visits: number;

  @Field(() => [AppointmentOutput])
  upcoming_appointment_list: AppointmentOutput[];
}
