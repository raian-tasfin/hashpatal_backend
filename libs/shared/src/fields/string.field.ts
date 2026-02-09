import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { Field, FieldOptions } from '@nestjs/graphql';

export function StringField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => String, options),
    IsString(),
    Transform(({ value }) => value?.trim()),
    options?.nullable ? IsOptional() : IsNotEmpty(),
  );
}
