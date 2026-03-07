import { IsEmail, IsString } from 'class-validator';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function EmailField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  const formatter = (v: any) =>
    typeof v === 'string' ? v.trim().toLowerCase() : v;
  return generate_field({
    type: String,
    formatter,
    extraDecorators: [
      IsString({ each }),
      IsEmail({}, { each, message: 'Invalid email: "$value"' }),
    ],
  })(options);
}
