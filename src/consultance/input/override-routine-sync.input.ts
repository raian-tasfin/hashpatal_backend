import { InputType } from '@nestjs/graphql';
import { SchedulableField, UuidField } from '@org/shared/fields';
import { OverrideSlotInput } from '@org/shared/slots';
import { OverrideSlotField } from '@org/shared/slots/override-slots.field';

@InputType()
export class OverrideRoutineSyncInput {
  @UuidField()
  entityUuid: string;

  @SchedulableField()
  schedulable: string;

  @OverrideSlotField({ isArray: true })
  slots: OverrideSlotInput[];
}
