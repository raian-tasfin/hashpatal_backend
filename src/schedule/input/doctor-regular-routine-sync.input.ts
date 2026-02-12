import { InputType } from '@nestjs/graphql';
import { EmailField } from '@org/shared/fields';
import { RegularSlotInput, RegularSlotsField } from '@org/shared/slots';

@InputType()
export class DoctorRegularRoutineSyncInput {
  @EmailField()
  email: string;

  @RegularSlotsField()
  slots: RegularSlotInput[];
}
