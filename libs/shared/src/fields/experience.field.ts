import { YearField } from './year.field';
import { StringField } from './string.field';
import { Field, FieldOptions, InputType } from '@nestjs/graphql';
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

export function ExperienceField(options?: FieldOptions) {
  return applyDecorators(
    Field(() => [ExperienceInput], {
      ...options,
      description: 'Full list of professional experience',
    }),
    options?.nullable ? IsOptional() : IsNotEmpty(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ExperienceInput),
  );
}
