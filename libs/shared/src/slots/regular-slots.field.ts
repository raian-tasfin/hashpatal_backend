import { RegularSlotInput } from './regular-slot.input';
import { SlotsNoOverlapConstraint } from './slots-no-overlap.constraint';
import {
  generate_field,
  OrgFieldOptions,
} from '../fields/org-field-options.type';

export function RegularSlotField(options?: OrgFieldOptions) {
  return generate_field({
    type: RegularSlotInput,
    objectType: true,
    constraints: [SlotsNoOverlapConstraint],
  })(options);
}
