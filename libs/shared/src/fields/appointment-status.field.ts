import { IsEnum } from 'class-validator';
import { AppointmentStatusType } from '../db';
import { generate_field, OrgFieldOptions } from './org-field-options.type';

export function AppointmentStatusField(options?: OrgFieldOptions) {
  const each = options?.isArray ?? false;
  return generate_field({
    type: AppointmentStatusType,
    extraDecorators: [IsEnum(AppointmentStatusType, { each })],
  })(options);
}
