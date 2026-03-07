import { IsISO8601 } from 'class-validator';
import {
  generate_field,
  OrgFieldOptions,
} from '../fields/org-field-options.type';
import { format_date } from './format-date.formatter';

export function DateField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  const formatter = format_date;
  return generate_field({
    type: String,
    extraDecorators: [
      IsISO8601({ strict: true }, { each, message: 'Invalid date format' }),
    ],
    formatter,
  })(options);
}
