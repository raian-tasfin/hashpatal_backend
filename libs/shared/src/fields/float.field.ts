import { IsNumber } from 'class-validator';
import { Float } from '@nestjs/graphql';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function NumberField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  const formatter = (v: any) =>
    v === '' || v === null ? undefined : Number(v);
  return generate_field({
    type: Float,
    formatter,
    extraDecorators: [IsNumber({}, { each })],
  })(options);
}
