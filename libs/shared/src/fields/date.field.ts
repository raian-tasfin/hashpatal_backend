import { applyDecorators } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsISO8601 } from 'class-validator';

export function DateField() {
  return applyDecorators(
    Field(() => String, { description: 'Date in YYYY-MM-DD format' }),
    Transform(({ value }) => {
      if (value instanceof Date) {
        return value.toISOString().split('T')[0];
      }
      return value;
    }),
    IsNotEmpty(),
    IsISO8601(
      { strict: true },
      { message: 'Date must be in YYYY-MM-DD format' },
    ),
  );
}
