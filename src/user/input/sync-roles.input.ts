import { InputType } from '@nestjs/graphql';
import { Role } from '@org/shared/db';
import { EmailField, RolesField } from '@org/shared/fields';

@InputType()
export class SyncRolesInput {
  @EmailField()
  email: string;

  @RolesField()
  roles: Role[];
}
