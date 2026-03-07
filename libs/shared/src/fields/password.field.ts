import { IsString, MinLength } from 'class-validator';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function PasswordField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: String,
    extraDecorators: [
      IsString({ each }),
      MinLength(4, { each, message: 'Password is too short' }),
    ],
  })(options);
}
