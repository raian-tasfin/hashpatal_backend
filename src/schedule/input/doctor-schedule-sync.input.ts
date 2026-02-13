import { InputType } from '@nestjs/graphql';
import { EmailField, IntegerField } from '@org/shared/fields';

@InputType()
export class DoctorScheduleSyncInput {
  @EmailField()
  email: string;

  @IntegerField()
  minutesPerSlot: number;

  @IntegerField()
  maxBookingDays: number;
}
