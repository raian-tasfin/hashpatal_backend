import { InputType } from '@nestjs/graphql';
import { StringField } from '@org/shared/fields';

@InputType()
export class AddDepartmentInput {
  @StringField()
  name: string;
}
