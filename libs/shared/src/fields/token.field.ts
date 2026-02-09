import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export function TokenField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => String, options),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsString(),
  );
}
