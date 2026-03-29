import { IsEnum } from 'class-validator';
import { DurationUnitType } from '../db';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function DurationUnitField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: DurationUnitType,
    extraDecorators: [IsEnum(DurationUnitType, { each })],
  })(options);
}
