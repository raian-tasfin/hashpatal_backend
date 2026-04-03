import { ObjectType, Field } from '@nestjs/graphql';
import { StringField } from '@org/shared/fields';

@ObjectType()
export class DoctorListItemOutput {
  @StringField()
  uuid: string;

  @StringField()
  name: string;

  @StringField()
  email: string;

  @StringField({ nullable: true })
  department_uuid: string | null;

  @StringField({ nullable: true })
  department_name: string | null;

  static from_model(model: {
    uuid: string;
    name: string;
    email: string;
    department_uuid: string | null;
    department_name: string | null;
  }): DoctorListItemOutput {
    const out = new DoctorListItemOutput();
    out.uuid = model.uuid;
    out.name = model.name;
    out.email = model.email;
    out.department_uuid = model.department_uuid ?? null;
    out.department_name = model.department_name ?? null;
    return out;
  }
}
