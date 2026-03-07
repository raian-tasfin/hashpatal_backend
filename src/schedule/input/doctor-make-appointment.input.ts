import { InputType } from '@nestjs/graphql';
import { DateField } from '@org/shared/date';
import { EmailField } from '@org/shared/fields';

@InputType()
export class DoctorMakeAppointment {
  @EmailField()
  email: string;

  @DateField()
  dates: string;
}
