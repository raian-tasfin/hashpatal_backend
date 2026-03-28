import { InputType } from '@nestjs/graphql';
import { SchedulableField, UuidField } from '@org/shared/fields';
import { RoutineSlotField, RoutineSlotInput } from '@org/shared/slots';

@InputType()
export class RoutineSyncInput {
  @UuidField()
  entityUuid: string;

  @SchedulableField()
  schedulable: string;

  @RoutineSlotField({ isArray: true })
  slots: RoutineSlotInput[];
}
