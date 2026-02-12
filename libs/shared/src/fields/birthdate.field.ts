import { IsISO8601 } from 'class-validator';
import { IsAdultConstraint } from '@org/shared/constraints';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function BirthdateField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: String,
    constraints: [IsAdultConstraint],
    extraDecorators: [IsISO8601({ strict: true }, { each })],
  })(options);
}
