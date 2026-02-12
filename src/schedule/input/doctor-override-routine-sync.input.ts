import { InputType } from '@nestjs/graphql';
import { EmailField } from '@org/shared/fields';
import { OverrideSlotInput } from '@org/shared/slots';
import { OverrideSlotsField } from '@org/shared/slots/override-slots.field';

@InputType()
export class DoctorOverrideRoutineSyncInput {
  @EmailField()
  email: string;

  @OverrideSlotsField()
  slots: OverrideSlotInput[];
}
