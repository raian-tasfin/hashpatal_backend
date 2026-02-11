import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { SchedulableType } from '../db';

export function SchedulableField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => [SchedulableType], options),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsArray(),
    IsEnum(SchedulableType, { each: true, message: 'Inavlid role provided' }),
  );
}
