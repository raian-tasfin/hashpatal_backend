import { IsEnum } from 'class-validator';
import { SchedulableType } from '../db';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function SchedulableField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: SchedulableType,
    extraDecorators: [IsEnum(SchedulableType, { each })],
  })(options);
}
