import { IsEnum } from 'class-validator';
import { ShiftType } from '../db';
import {
  generate_field,
  OrgFieldOptions,
} from '../fields/org-field-options.type';

export function ShiftField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? true;
  const type = ShiftType;
  return generate_field({
    type,
    extraDecorators: [IsEnum(ShiftType, { each })],
  })(options);
}
