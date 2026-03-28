import { IsBoolean } from 'class-validator';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function BooleanField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  const formatter = (v: any) => (typeof v === 'boolean' ? v : Boolean(v));
  return generate_field({
    type: Boolean,
    formatter,
    extraDecorators: [IsBoolean({ each })],
  })(options);
}
