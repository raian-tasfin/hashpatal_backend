import { ObjectType } from '@nestjs/graphql';
import { OverrideRoutine, ShiftType } from '@org/shared/db';
import { TimeField, DateField } from '@org/shared/fields';
import { ShiftField } from '@org/shared/slots';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class OverrideRoutineOutput {
  id: number;

  @DateField()
  date: string;

  @ShiftField()
  shift: ShiftType;

  @TimeField()
  startTime: string;

  @TimeField()
  endTime: string;

  static from_model(model: OverrideRoutine): OverrideRoutineOutput {
    return plainToInstance(OverrideRoutineOutput, model);
  }
}
