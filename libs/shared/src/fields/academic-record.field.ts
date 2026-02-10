import { YearField } from './year.field';
import { StringField } from './string.field';
import { Field, FieldOptions, InputType } from '@nestjs/graphql';
import { applyDecorators } from '@nestjs/common';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export const AcademicRecord = {
  DegreeField: StringField,
  InstituteField: StringField,
  YearField: YearField,
};

@InputType()
export class AcademicRecordInput {
  @AcademicRecord.DegreeField()
  degree: string;

  @AcademicRecord.InstituteField()
  institute: string;

  @AcademicRecord.YearField()
  year: string;
}

export function AcademicRecordField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => [AcademicRecordInput], {
      ...options,
      description: 'Full list of academic record',
    }),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => AcademicRecordInput),
  );
}
