import { RoutineSlotInput } from './regular-slot.input';
import { SlotsNoOverlapConstraint } from './slots-no-overlap.constraint';
import {
  generate_field,
  OrgFieldOptions,
} from '../fields/org-field-options.type';

export function RoutineSlotField(options?: OrgFieldOptions) {
  return generate_field({
    type: RoutineSlotInput,
    objectType: true,
    collectionConstraints: [SlotsNoOverlapConstraint],
  })(options);
}
