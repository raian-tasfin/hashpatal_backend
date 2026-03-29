import { InputType } from '@nestjs/graphql';
import { NormalStringField } from '@org/shared/fields';

@InputType()
export class AddComplaintInput {
  @NormalStringField()
  name: string;
}
