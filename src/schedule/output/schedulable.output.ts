import { ObjectType } from '@nestjs/graphql';
import { Schedule } from '@org/shared/db';
import { IntegerField, UuidField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class ScheduleOutput {
  id: number;
  entity_id: number;

  @UuidField()
  uuid: string;

  //   @IntegerField()
  minutes_per_slot: number;

  //   @IntegerField()
  max_booking_days: number;

  static from_model(model: Schedule): ScheduleOutput {
    return plainToInstance(ScheduleOutput, model);
  }
}
