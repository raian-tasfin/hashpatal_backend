import { InputType } from '@nestjs/graphql';
import { DateField, IntegerField } from '@org/shared/fields';

@InputType()
export class DoctorBlockedDaysAddInput {
  id: number;

  @DateField()
  date: string;

  @IntegerField()
  schedulableId: number;
}
