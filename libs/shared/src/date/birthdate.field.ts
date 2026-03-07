import { OrgFieldOptions } from '../fields/org-field-options.type';
import { IsAdultConstraint } from './adult.constraint';
import { DateField } from './date.field';

export function BirthdateField(options?: OrgFieldOptions) {
  return DateField({
    ...options,
    constraints: [...(options?.constraints ?? []), IsAdultConstraint],
  });
}
