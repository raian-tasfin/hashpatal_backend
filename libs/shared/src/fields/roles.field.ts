import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from '../db';

export function RolesField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => [Role], options),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsArray(),
    IsEnum(Role, { each: true, message: 'Inavlid role provided' }),
  );
}
