import { ObjectType } from '@nestjs/graphql';
import { StringField } from '@org/shared/fields';
import { RoleType, User } from '@org/shared/db';
import { Field } from '@nestjs/graphql';

@ObjectType()
export class UserListItemOutput {
  @StringField()
  uuid: string;

  @StringField()
  name: string;

  @StringField()
  email: string;

  @Field(() => [RoleType])
  roles: RoleType[];

  static from_model(model: User & { roles: RoleType[] }): UserListItemOutput {
    const out = new UserListItemOutput();
    out.uuid = model.uuid;
    out.name = model.name;
    out.email = model.email;
    out.roles = model.roles;
    return out;
  }
}
