import { ObjectType } from '@nestjs/graphql';
import { Medication } from '@org/shared/db';
import { FoodRelationField, StringField, UuidField } from '@org/shared/fields';

@ObjectType()
export class MedicationOutput {
  id: number;

  @UuidField()
  uuid: string;

  @StringField()
  name: string;

  @StringField()
  generic_name: string;

  @StringField()
  dose_unit: string;

  @FoodRelationField()
  food_relation: string;

  static from_model(model: Medication): MedicationOutput {
    const out = new MedicationOutput();
    out.id = model.id;
    out.uuid = model.uuid;
    out.name = model.name;
    out.generic_name = model.generic_name;
    out.dose_unit = model.dose_unit;
    out.food_relation = model.food_relation;
    return out;
  }
}
