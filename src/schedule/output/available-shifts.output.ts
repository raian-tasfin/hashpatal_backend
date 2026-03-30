import { ObjectType } from '@nestjs/graphql';
import { DateField } from '@org/shared/date';
import { BooleanField, ShiftField, TimeField } from '@org/shared/fields';

@ObjectType()
export class AvailableShiftOutput {
  @DateField()
  date: string;

  @ShiftField()
  shift: string;

  @BooleanField()
  status: boolean;

  @TimeField()
  start_time: string;

  @TimeField()
  end_time: string;
}
