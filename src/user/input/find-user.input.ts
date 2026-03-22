import { InputType, IntersectionType, PartialType } from '@nestjs/graphql';
import { AtLeastOne } from '@org/shared/constraints';
import { FindByEmailInput } from './find-by-email.input';
import { FindByUuidInput } from './find-by-uuid.input';

@InputType()
@AtLeastOne(['email', 'uuid'])
export class FindUserInput extends PartialType(
  IntersectionType(FindByEmailInput, FindByUuidInput),
) {}
