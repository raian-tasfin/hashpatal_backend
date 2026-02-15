import { IsEnum } from 'class-validator';
import { ShiftType } from '../db';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function ShiftField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: ShiftType,
    extraDecorators: [IsEnum(ShiftType, { each })],
  })(options);
}
