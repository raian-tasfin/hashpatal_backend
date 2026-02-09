import { InputType } from '@nestjs/graphql';
import { EmailField } from '@org/shared/fields';

@InputType()
export class FindByEmailInput {
  @EmailField()
  email: string;
}
