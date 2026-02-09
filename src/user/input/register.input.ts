import { InputType } from '@nestjs/graphql';
import {
  BirthdateField,
  EmailField,
  NameField,
  PasswordField,
} from '@org/shared/fields';

@InputType()
export class RegisterUserInput {
  @EmailField()
  email: string;

  @NameField()
  name: string;

  @PasswordField()
  password: string;

  @BirthdateField()
  birthDate: string;
}
