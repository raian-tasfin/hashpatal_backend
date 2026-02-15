import { IsISO8601 } from 'class-validator';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function format_date(v: Date | string): string {
  return v instanceof Date ? v.toISOString().split('T')[0] : v;
}

export function DateField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  const formatter = format_date;
  return generate_field({
    type: String,
    extraDecorators: [IsISO8601({ strict: true }, { each })],
    formatter,
  })(options);
}
