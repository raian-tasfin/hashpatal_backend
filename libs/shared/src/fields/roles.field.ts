import { IsEnum } from 'class-validator';
import { RoleType } from '../db';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function RoleField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? true;
  return generate_field({
    type: RoleType,
    extraDecorators: [IsEnum(RoleType, { each })],
  })(options);
}
