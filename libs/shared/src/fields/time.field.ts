import { Matches } from 'class-validator';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function TimeField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return generate_field({
    type: String,
    extraDecorators: [Matches(regex, { each })],
  })(options);
}
