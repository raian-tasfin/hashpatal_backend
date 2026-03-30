import { PrescriptionItemDetailInput } from 'src/consultance/input';
import {
  field,
  generate_field,
  is_array,
  nullable,
  OrgFieldOptions,
} from './org-field-options.type';

export function PrescriptionItemDetailField(options?: OrgFieldOptions) {
  return generate_field({
    type: PrescriptionItemDetailInput,
    objectType: true,
  })(options);
}
