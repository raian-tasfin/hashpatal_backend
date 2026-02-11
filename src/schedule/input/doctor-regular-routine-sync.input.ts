import { InputType } from '@nestjs/graphql';
import {
  EmailField,
  RegularRoutineSlotInput,
  RegularRoutineSlotsField,
} from '@org/shared/fields';

@InputType()
export class DoctorRegularRoutineSyncInput {
  @EmailField()
  email: string;

  @RegularRoutineSlotsField()
  slots: RegularRoutineSlotInput[];
}
