import { ObjectType } from '@nestjs/graphql';
import { ShiftField, TimeField } from '@org/shared/fields';

@ObjectType()
export class AvailableSlotOutput {
  @ShiftField()
  shift: string;

  @TimeField()
  startTime: string;

  @TimeField()
  endTime: string;
}
