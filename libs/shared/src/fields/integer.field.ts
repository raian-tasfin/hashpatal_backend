import { IsInt } from 'class-validator';
import { Int } from '@nestjs/graphql';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function IntegerField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  const formatter = (v: any) =>
    v === '' || v === null ? undefined : Number(v);

  return generate_field({
    type: Int,
    formatter,
    extraDecorators: [IsInt({ each })],
  })(options);
}
