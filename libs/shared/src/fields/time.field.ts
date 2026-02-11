import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export function TimeField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => String, options),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'Time must be in HH:MM format',
    }),
  );
}
