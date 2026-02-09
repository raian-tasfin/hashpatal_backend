import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAdult', async: false })
export class IsAdultConstraint implements ValidatorConstraintInterface {
  validate(birthdateStr: string) {
    if (!birthdateStr) return false;
    const birthdate = new Date(birthdateStr);
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
    return birthdate <= eighteenYearsAgo;
  }

  defaultMessage() {
    return 'You must be at least 18 years old';
  }
}
