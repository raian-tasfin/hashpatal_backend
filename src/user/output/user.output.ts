import { ObjectType } from '@nestjs/graphql';
import { DateField, format_date } from '@org/shared/date';
import { User } from '@org/shared/db';
import { EmailField, StringField, UuidField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class UserOutput {
  id: number;

  @UuidField()
  uuid: string;

  @EmailField()
  email: string;

  @DateField()
  birthDate: string;

  @StringField()
  name: string;

  static from_model(model: User): UserOutput {
    const out = new UserOutput();
    out.id = model.id;
    out.uuid = model.uuid;
    out.email = model.email;
    out.name = model.name;
    out.birthDate = format_date(model.birth_date as any);
    return out;
  }
}
