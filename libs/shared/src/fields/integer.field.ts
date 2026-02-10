import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { Field, FieldOptions, Int } from '@nestjs/graphql';

export function IntegerField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => Int, options),
    Transform(({ value }) =>
      value === null || value === undefined ? value : Number(value),
    ),
    IsInt(),
    options?.nullable ? IsOptional() : IsNotEmpty(),
  );
}
