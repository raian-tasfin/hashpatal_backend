import { ObjectType } from '@nestjs/graphql';
import { Complaint } from '@org/shared/db';
import { StringField, UuidField } from '@org/shared/fields';

@ObjectType()
export class ComplaintOutput {
  id: number;

  @UuidField()
  uuid: string;

  @StringField()
  name: string;

  static from_model(model: Complaint): ComplaintOutput {
    const out = new ComplaintOutput();
    out.id = model.id;
    out.uuid = model.uuid;
    out.name = model.name;
    return out;
  }
}
