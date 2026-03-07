import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { differenceInYears, isValid, parseISO } from 'date-fns';

/*
 * Assume that a Date or a derivative decorator is using it. So the
 * date is validated already.
 */
@ValidatorConstraint({ name: 'isAdult', async: false })
export class IsAdultConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!value) return false;
    const birthdate = typeof value === 'string' ? parseISO(value) : value;
    if (!isValid(birthdate)) return false;
    return differenceInYears(new Date(), birthdate) >= 18;
  }

  defaultMessage() {
    return 'You must be at least 18 years old';
  }
}
