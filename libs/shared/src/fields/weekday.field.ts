import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { WeekDayType } from '../db';

export function WeekDayField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => WeekDayType, options),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsEnum(WeekDayType, { message: 'Inavlid week day provided' }),
  );
}
