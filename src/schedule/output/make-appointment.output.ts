import { ObjectType } from '@nestjs/graphql';
import { DateField } from '@org/shared/date';
import { TimeField } from '@org/shared/fields';

@ObjectType()
export class MakeAppointmentOutput {
  @DateField()
  date: string;

  @TimeField()
  start_time: string;
}
