import { InputType } from '@nestjs/graphql';
import {
  UuidField,
  NumberField,
  MedicationFrequencyField,
  IntegerField,
  DurationUnitField,
} from '@org/shared/fields';

@InputType()
export class AddPrescriptionItemInput {
  @UuidField()
  appointment_uuid: string;

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
