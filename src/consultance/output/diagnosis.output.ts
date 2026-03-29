import { ObjectType } from '@nestjs/graphql';
import { Diagnosis } from '@org/shared/db';
import { StringField, UuidField } from '@org/shared/fields';

@ObjectType()
export class DiagnosisOutput {
  id: number;

  @UuidField()
  uuid: string;

  @StringField()
  name: string;

  static from_model(model: Diagnosis): DiagnosisOutput {
    const out = new DiagnosisOutput();
    out.id = model.id;
    out.uuid = model.uuid;
    out.name = model.name;
    return out;
  }
}
