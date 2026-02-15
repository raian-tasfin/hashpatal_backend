import { InputType } from '@nestjs/graphql';
import { DateField, EmailField } from '@org/shared/fields';

@InputType()
export class DoctorMakeAppointment {
  @EmailField()
  email: string;

  @DateField()
  dates: string[];
}
