import { InputType } from '@nestjs/graphql';
import { RoleType } from '@org/shared/db';
import { EmailField, RoleField } from '@org/shared/fields';

@InputType()
export class SyncRolesInput {
  @EmailField()
  email: string;

  @RoleField({ isArray: true })
  roles: RoleType[];
}
