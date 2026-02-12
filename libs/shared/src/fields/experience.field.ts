import { YearField } from './year.field';
import {
  field,
  generate_field,
  is_array,
  nullable,
  OrgFieldOptions,
} from './org-field-options.type';
import { StringField } from './string.field';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';

export const Experience = {
  StartYearField: YearField,
  EndYearField: YearField,
  TitleField: StringField,
  OrganizationField: StringField,
  LocationField: StringField.bind(null, { nullable: true }),
};

@InputType()
export class ExperienceInput {
  @Experience.TitleField()
  title: string;

  @Experience.OrganizationField()
  organization: string;

  @Experience.LocationField()
  location: string | null;

  @Experience.StartYearField()
  startYear: string;

  @Experience.EndYearField({ nullable: true })
  endYear: string | null;
}

export function ExperienceField(options?: OrgFieldOptions) {
  return generate_field({
    type: ExperienceInput,
    objectType: true,
  })(options);
}
