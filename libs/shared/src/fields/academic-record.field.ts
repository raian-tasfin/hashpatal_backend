import { YearField } from './year.field';
import { StringField } from './string.field';
import { Field, InputType } from '@nestjs/graphql';
import { applyDecorators } from '@nestjs/common';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  field,
  generate_field,
  is_array,
  nullable,
  OrgFieldOptions,
} from './org-field-options.type';

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

export function AcademicRecordField(options?: OrgFieldOptions) {
  return generate_field({
    type: AcademicRecordInput,
    objectType: true,
  })(options);
}
