import { applyDecorators } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { Field, FieldOptions } from '@nestjs/graphql';

export function EmailField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => String, options),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsEmail({}, { message: 'Please provide a valid email address' }),
    IsString(),
    Transform(({ value }) => value?.trim().toLowerCase()),
  );
}
