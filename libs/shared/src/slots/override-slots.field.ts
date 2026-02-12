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
import { OverrideSlotInput } from './override-slot.input';
import { SlotsNoOverlapConstraint } from './slots-no-overlap.constraint';

export function OverrideSlotsField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => [OverrideSlotInput], { ...options }),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => OverrideSlotInput),
    Validate(SlotsNoOverlapConstraint),
  );
}
