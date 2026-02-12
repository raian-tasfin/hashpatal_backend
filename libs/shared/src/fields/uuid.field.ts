import { IsUUID } from 'class-validator';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function UuidField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: String,
    extraDecorators: [IsUUID('4', { each })],
  })(options);
}
