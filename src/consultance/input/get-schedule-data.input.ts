import { InputType } from '@nestjs/graphql';
import { UuidField, SchedulableField } from '@org/shared/fields';

@InputType()
export class GetScheduleDataInput {
  @UuidField()
  entityUuid: string;

  @SchedulableField()
  schedulable: string;
}
