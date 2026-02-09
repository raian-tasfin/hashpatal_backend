import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export function UuidField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => String, options),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsUUID(),
  );
}
