import { ObjectType } from '@nestjs/graphql';
import { DateField } from '@org/shared/date';
import { BooleanField, ShiftField } from '@org/shared/fields';

@ObjectType()
export class AvailableShiftOutput {
  @DateField()
  date: string;

  @ShiftField()
  shift: string;

  @BooleanField()
  status: boolean;
}
