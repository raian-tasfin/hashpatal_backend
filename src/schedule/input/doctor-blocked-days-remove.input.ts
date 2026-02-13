import { InputType } from '@nestjs/graphql';
import { DateField, EmailField } from '@org/shared/fields';

@InputType()
export class DoctorBlockedDaysRemoveInput {
  @EmailField()
  email: string;

  @DateField({ isArray: true })
  dates: string[];
}
