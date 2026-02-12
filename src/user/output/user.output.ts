import { ObjectType } from '@nestjs/graphql';
import { User } from '@org/shared/db';
import { EmailField, UuidField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class UserOutput {
  id: number;

  @UuidField()
  uuid: string;

  @EmailField()
  email: string;

  static from_model(model: User): UserOutput {
    return plainToInstance(UserOutput, model);
  }
}
