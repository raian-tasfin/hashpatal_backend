import { InputType } from '@nestjs/graphql';
import { EmailField } from '@org/shared/fields';
import { RegularSlotInput, RegularSlotField } from '@org/shared/slots';

@InputType()
export class DoctorRegularRoutineSyncInput {
  @EmailField()
  email: string;

  @RegularSlotField({ isArray: true })
  slots: RegularSlotInput[];
}
