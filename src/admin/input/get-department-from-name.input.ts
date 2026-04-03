import { InputType } from '@nestjs/graphql';
import { StringField } from '@org/shared/fields';

@InputType()
export class GetDepartmentFromNameInput {
  @StringField()
  name: string;
}
