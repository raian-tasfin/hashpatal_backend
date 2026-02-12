import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  Validate,
  ValidateNested,
  ValidatorConstraintInterface,
} from 'class-validator';

export type OrgFieldOptions = FieldOptions & {
  isArray?: boolean;
};

export const field = (T: any, options?: OrgFieldOptions) => {
  return Field(() => (options?.isArray ? [T] : T), {
    ...options,
  });
};

export const array_map = (isArray: boolean, value: any, func: any) => {
  if (value === null || value === undefined) return value;
  return isArray && Array.isArray(value) ? value.map(func) : func(value);
};

export const nullable = (options?: OrgFieldOptions) => {
  return options?.nullable ? IsOptional() : IsNotEmpty();
};

const NoOp = () => () => {};

export const is_array = (options?: OrgFieldOptions) => {
  return options?.isArray ? IsArray() : NoOp();
};

export interface GenerateFieldConfig {
  type: any;
  objectType?: boolean;
  extraDecorators?: PropertyDecorator[];
  constraints?: (new (...args: any[]) => ValidatorConstraintInterface)[];
  formatter?: (value: any) => any;
}

export function generate_field({
  type,
  objectType,
  extraDecorators = [],
  constraints = [],
  formatter,
}: GenerateFieldConfig) {
  return (options?: OrgFieldOptions) => {
    const isArray = options?.isArray ?? false;
    const decorators: PropertyDecorator[] = [
      field(type, options),
      nullable(options),
      is_array(options),
    ];
    if (formatter) {
      decorators.push(
        Transform(({ value }) => array_map(isArray, value, formatter)),
      );
    }
    if (objectType) {
      decorators.push(Type(() => type));
      decorators.push(ValidateNested({ each: isArray }));
    }
    for (const constraint of constraints) {
      decorators.push(Validate(constraint, { each: isArray }));
    }
    decorators.push(...extraDecorators);
    return applyDecorators(...decorators);
  };
}
