import { InputType } from '@nestjs/graphql';
import { DateField } from '@org/shared/date';
import { EmailField } from '@org/shared/fields';

@InputType()
export class DoctorBlockedDaysAddInput {
  @EmailField()
  email: string;

  @DateField({ isArray: true })
  dates: string[];
}
