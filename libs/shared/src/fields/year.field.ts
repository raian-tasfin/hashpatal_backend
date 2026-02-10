import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { IsNotEmpty, Validate, IsString } from 'class-validator';
import { IsValidYearConstraint } from '@org/shared/constraints';

export function YearField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => String, { description: '4-digit year (YYYY)', ...options }),
    IsNotEmpty(),
    IsString(),
    Validate(IsValidYearConstraint),
  );
}
