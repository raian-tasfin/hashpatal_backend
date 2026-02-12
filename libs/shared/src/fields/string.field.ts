import { IsString } from 'class-validator';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function StringField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  const formatter = (v: any) => (typeof v === 'string' ? v.trim() : v);

  return generate_field({
    type: String,
    formatter,
    extraDecorators: [IsString({ each })],
  })(options);
}
