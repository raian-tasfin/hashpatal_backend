import { ObjectType } from '@nestjs/graphql';
import { TokenField } from '@org/shared/fields';

@ObjectType()
export class TokenPair {
  @TokenField()
  accessToken: string;

  @TokenField()
  refreshToken: string;
}
