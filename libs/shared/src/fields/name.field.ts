import { StringField } from './string.field';
import { OrgFieldOptions } from './org-field-options.type';

export function NameField(options?: OrgFieldOptions) {
  return StringField(options);
}
