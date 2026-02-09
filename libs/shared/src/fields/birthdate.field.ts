import { applyDecorators } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { IsNotEmpty, IsISO8601, Validate } from 'class-validator';
import { IsAdultConstraint } from '@org/shared/constraints';

export function BirthdateField() {
  return applyDecorators(
    Field(() => String, { description: 'Birthday in YYYY-MM-DD format' }),
    IsNotEmpty(),
    IsISO8601(
      { strict: true },
      { message: 'Birthday must be in YYYY-MM-DD format' },
    ),
    Validate(IsAdultConstraint),
  );
}
