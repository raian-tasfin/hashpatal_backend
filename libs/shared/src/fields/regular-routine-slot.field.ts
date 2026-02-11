import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions, InputType } from '@nestjs/graphql';
import { WeekDayType } from '@org/shared/db';
import { TimeField } from './time.field';
import { WeekDayField } from './weekday.field';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  Validate,
  ValidateNested,
} from 'class-validator';
import { RegularSlotNoOverlapConstraint } from '../constraints';

@InputType()
export class RegularRoutineSlotInput {
  @WeekDayField()
  weekDay: WeekDayType;

  @TimeField()
  startTime: string;

  @TimeField()
  endTime: string;
}

export function RegularRoutineSlotsField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => [RegularRoutineSlotInput], { ...options }),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => RegularRoutineSlotInput),
    Validate(RegularSlotNoOverlapConstraint),
  );
}
