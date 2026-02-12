import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  Validate,
  ValidateNested,
} from 'class-validator';
import { RegularSlotInput } from './regular-slot.input';
import { SlotsNoOverlapConstraint } from './slots-no-overlap.constraint';

export function RegularSlotsField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => [RegularSlotInput], { ...options }),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => RegularSlotInput),
    Validate(SlotsNoOverlapConstraint),
  );
}
