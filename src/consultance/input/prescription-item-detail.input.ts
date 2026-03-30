import { InputType } from '@nestjs/graphql';
import {
  DurationUnitField,
  IntegerField,
  MedicationFrequencyField,
  NumberField,
  UuidField,
} from '@org/shared/fields';

@InputType()
export class PrescriptionItemDetailInput {
  @UuidField()
  medication_uuid: string;

  @NumberField()
  dose_quantity: number;

  @MedicationFrequencyField()
  frequency: string;

  @IntegerField()
  duration_value: number;

  @DurationUnitField()
  duration_unit: string;
}
