import { InputType } from '@nestjs/graphql';
import { RoleType } from '@org/shared/db';
import { EmailField, RolesField } from '@org/shared/fields';

@InputType()
export class SyncRolesInput {
  @EmailField()
  email: string;

  @RolesField()
  roles: RoleType[];
}
