import { InputType } from '@nestjs/graphql';
import { DateField } from '@org/shared/date';
import { UuidField, SchedulableField } from '@org/shared/fields';

@InputType()
export class BlockedDaysRemoveInput {
  @UuidField()
  entityUuid: string;

  @SchedulableField()
  schedulable: string;

  @DateField({ isArray: true })
  dates: string[];
}
