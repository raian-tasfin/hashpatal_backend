import { InputType } from '@nestjs/graphql';
import { IntegerField, UuidField } from '@org/shared/fields';

@InputType()
export class DoctorScheduleSyncInput {
  @UuidField()
  uuid: string;

  @IntegerField()
  minutesPerSlot: number;

  @IntegerField()
  maxBookingDays: number;
}
