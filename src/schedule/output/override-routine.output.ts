import { ObjectType } from '@nestjs/graphql';
import { OverrideRoutine } from '@org/shared/db';
import { TimeField, DateField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class OverrideRoutineOutput {
  id: number;

  @DateField()
  date: string;

  @TimeField()
  startTime: string;

  @TimeField()
  endTime: string;

  static from_model(model: OverrideRoutine): OverrideRoutineOutput {
    return plainToInstance(OverrideRoutineOutput, model);
  }
}
