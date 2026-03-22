import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'atLeastOne', async: false })
export class AtLeastOneConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const [relatedPropertyNames] = args.constraints as [string[]];
    const object = args.object as any;
    return relatedPropertyNames.some((name) => !!object[name]);
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyNames] = args.constraints as [string[]];
    return `At least one of these fields must be provided: ${relatedPropertyNames.join(', ')}`;
  }
}

export function AtLeastOne(
  fields: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: any) {
    registerDecorator({
      target: object,
      propertyName: 'atLeastOne',
      options: validationOptions,
      constraints: [fields],
      validator: AtLeastOneConstraint,
    });
  };
}
