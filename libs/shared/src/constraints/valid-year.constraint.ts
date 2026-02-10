import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidYear', async: false })
export class IsValidYearConstraint implements ValidatorConstraintInterface {
  validate(yearStr: string) {
    if (!yearStr) return false;
    if (!/^\d{4}$/.test(yearStr)) return false;
    const year = parseInt(yearStr, 10);
    const currentYear = new Date().getFullYear();
    return year <= currentYear && year > 1900;
  }

  defaultMessage() {
    return 'Year must be a 4-digit number and cannot be in the future';
  }
}
