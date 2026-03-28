import { InputType } from '@nestjs/graphql';
import { UuidField } from '@org/shared/fields';

@InputType()
export class FindDepartmentInput {
  @UuidField()
  uuid: string;
}
