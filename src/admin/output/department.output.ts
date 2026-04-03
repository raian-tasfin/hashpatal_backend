import { ObjectType } from '@nestjs/graphql';
import { Department } from '@org/shared/db';
import { StringField, UuidField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class DepartmentOutput {
  id: number;

  @UuidField()
  uuid: string;

  @StringField()
  name: string;

  static from_model(model: Department): DepartmentOutput {
    return plainToInstance(DepartmentOutput, model);
  }
}
