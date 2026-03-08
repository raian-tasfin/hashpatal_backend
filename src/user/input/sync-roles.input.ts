import { InputType } from '@nestjs/graphql';
import { RoleType } from '@org/shared/db';
import { RoleField, UuidField } from '@org/shared/fields';

@InputType()
export class SyncRolesInput {
  @UuidField()
  uuid: string;

  @RoleField({ isArray: true })
  roles: RoleType[];
}
