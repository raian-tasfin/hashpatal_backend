import { IsEnum } from 'class-validator';
import { WeekDayType } from '../db';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function WeekDayField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;

  return generate_field({
    type: WeekDayType,
    extraDecorators: [IsEnum(WeekDayType, { each })],
  })(options);
}
