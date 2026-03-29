import { InputType } from '@nestjs/graphql';
import { UuidField, StringField, FoodRelationField } from '@org/shared/fields';

@InputType()
export class AddMedicationInput {
  @StringField()
  name: string;

  @StringField()
  generic_name: string;

  @StringField()
  dose_unit: string;

  @FoodRelationField()
  food_relation: string;
}
