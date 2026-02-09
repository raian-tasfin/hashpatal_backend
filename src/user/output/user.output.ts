import { ObjectType } from '@nestjs/graphql';
import { User } from '@org/shared/db';
import { EmailField, UuidField } from '@org/shared/fields';

@ObjectType()
export class UserOutput {
  id: number;

  @UuidField()
  uuid: string;

  @EmailField()
  email: string;

  static from_model(model: User): UserOutput {
    const entity = new UserOutput();
    entity.id = model.id;
    entity.uuid = model.uuid;
    entity.email = model.email;
    return entity;
  }
}
