import { InputType } from '@nestjs/graphql';
import { EmailField, PasswordField } from '@org/shared/fields';

@InputType()
export class LoginInput {
  @EmailField()
  email: string;

  @PasswordField()
  password: string;
}
