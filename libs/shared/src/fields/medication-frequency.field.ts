import { IsEnum } from 'class-validator';
import { MedicationFrequencyType } from '../db';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function MedicationFrequencyField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: MedicationFrequencyType,
    extraDecorators: [IsEnum(MedicationFrequencyType, { each })],
  })(options);
}
