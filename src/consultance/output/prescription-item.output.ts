import { ObjectType } from '@nestjs/graphql';
import {
  DurationUnitField,
  IntegerField,
  MedicationFrequencyField,
  NumberField,
  StringField,
  UuidField,
} from '@org/shared/fields';

@ObjectType()
export class PrescriptionItemOutput {
  @UuidField()
  medication_uuid: string;

  @StringField()
  medication_name: string;

  @NumberField()
  dose_quantity: number;

  @MedicationFrequencyField()
  frequency: string;

  @IntegerField()
  duration_value: number;

  @DurationUnitField()
  duration_unit: string;

  static from_model(model: any): PrescriptionItemOutput {
    const out = new PrescriptionItemOutput();
    out.medication_uuid = model.medication_uuid;
    out.medication_name = model.medication_name;
    out.dose_quantity = Number(model.dose_quantity);
    out.frequency = model.frequency;
    out.duration_value = model.duration_value;
    out.duration_unit = model.duration_unit;
    return out;
  }
}
