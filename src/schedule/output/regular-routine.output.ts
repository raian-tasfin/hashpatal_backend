import { ObjectType } from '@nestjs/graphql';
import { RegularRoutine, ShiftType, WeekDayType } from '@org/shared/db';
import { TimeField, WeekDayField } from '@org/shared/fields';
import { ShiftField } from '@org/shared/slots';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class RegularRoutineOutput {
  id: number;

  @WeekDayField()
  weekDay: WeekDayType;

  @ShiftField()
  shift: ShiftType;

  @TimeField()
  startTime: string;

  @TimeField()
  endTime: string;

  static from_model(model: RegularRoutine): RegularRoutineOutput {
    return plainToInstance(RegularRoutineOutput, model);
  }
}
