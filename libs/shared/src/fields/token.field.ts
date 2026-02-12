import { IsString } from 'class-validator';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function TokenField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: String,
    extraDecorators: [IsString({ each })],
  })(options);
}
