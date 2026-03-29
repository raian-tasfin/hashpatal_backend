import { IsEnum } from 'class-validator';
import { FoodRelationType } from '../db';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function FoodRelationField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: FoodRelationType,
    extraDecorators: [IsEnum(FoodRelationType, { each })],
  })(options);
}
