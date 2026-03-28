import { InputType } from '@nestjs/graphql';
import { IntegerField, SchedulableField, UuidField } from '@org/shared/fields';

@InputType()
export class ScheduleSyncInput {
  @UuidField()
  entityUuid: string;

  @SchedulableField()
  schedulable: string;

  @IntegerField()
  minutes_per_slot: number;

  @IntegerField()
  max_booking_days: number;
}
