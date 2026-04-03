import { InputType } from '@nestjs/graphql';
import { UuidField } from '@org/shared/fields';

@InputType()
export class AssignDepartmentInput {
  @UuidField()
  departmentUuid: string;

  @UuidField()
  doctorUserUuid: string;
}
