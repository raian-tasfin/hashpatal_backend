import { InputType } from '@nestjs/graphql';
import { DateField, EmailField } from '@org/shared/fields';

@InputType()
export class DoctorBlockedDaysAddInput {
  @EmailField()
  email: string;

  @DateField({ isArray: true })
  dates: string[];
}
