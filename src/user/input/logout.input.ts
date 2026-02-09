import { InputType } from '@nestjs/graphql';
import { TokenField } from '@org/shared/fields';

@InputType()
export class LogoutInput {
  @TokenField()
  refreshToken: string;
}
