import { IsString } from 'class-validator';
import { IsValidYearConstraint } from '@org/shared/constraints';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function YearField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: String,
    constraints: [IsValidYearConstraint],
    extraDecorators: [IsString({ each })],
  })(options);
}
