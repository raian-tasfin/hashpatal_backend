import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ISlot } from '../slots';

@ValidatorConstraint({ name: 'regularSlotNoOverlap', async: false })
export class SlotsNoOverlapConstraint implements ValidatorConstraintInterface {
  validate<T extends ISlot>(slots: T[]) {
    const sorted = slots.sort((a, b) => {
      if (a.key !== b.key) {
        return a.key.localeCompare(b.key);
      }
      if (a.startTime !== b.startTime) {
        return a.endTime.localeCompare(b.startTime);
      }
      return a.endTime.localeCompare(b.endTime);
    });
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      if (current.key !== next.key) continue;
      if (current.endTime >= next.startTime) return false;
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} contains overlapping ranges.`;
  }
}
