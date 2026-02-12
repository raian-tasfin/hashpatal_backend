import { OverrideSlotInput } from './override-slot.input';
import { SlotsNoOverlapConstraint } from './slots-no-overlap.constraint';
import {
  generate_field,
  OrgFieldOptions,
} from '../fields/org-field-options.type';

export function OverrideSlotField(options?: OrgFieldOptions) {
  return generate_field({
    type: OverrideSlotInput,
    objectType: true,
    constraints: [SlotsNoOverlapConstraint],
  })(options);
}
