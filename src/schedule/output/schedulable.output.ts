import { ObjectType } from '@nestjs/graphql';
import { Schedule } from '@org/shared/db';
import { IntegerField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class ScheduleOutput {
  id: number;
  entityId: number;

  @IntegerField()
  minutesPerSlot: number;

  @IntegerField()
  maxBookingDays: number;

  static from_model(model: Schedule): ScheduleOutput {
    return plainToInstance(ScheduleOutput, model);
  }
}
