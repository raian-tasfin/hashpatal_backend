import { ObjectType } from '@nestjs/graphql';
import { Schedulable } from '@org/shared/db';
import { IntegerField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class SchedulableOutput {
  id: number;
  entityId: number;

  @IntegerField()
  minutesPerSlot: number;

  @IntegerField()
  maxBookingDays: number;

  static from_model(model: Schedulable): SchedulableOutput {
    return plainToInstance(SchedulableOutput, model);
  }
}
