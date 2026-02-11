import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RegularRoutineSlotInput } from '../fields';

@ValidatorConstraint({ name: 'regularSlotNoOverlap', async: false })
export class RegularSlotNoOverlapConstraint
  implements ValidatorConstraintInterface
{
  validate(slots: RegularRoutineSlotInput[]) {
    const sorted = slots.sort((a, b) => {
      if (a.weekDay !== b.weekDay) return a.weekDay.localeCompare(b.weekDay);
      if (a.startTime !== b.startTime) {
        return a.endTime.localeCompare(b.startTime);
      }
      return a.endTime.localeCompare(b.endTime);
    });
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      if (current.weekDay !== next.weekDay) continue;
      if (current.endTime >= next.startTime) return false;
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} contains overlapping ranges.`;
  }
}
