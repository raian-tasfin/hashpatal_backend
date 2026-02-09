import { applyDecorators } from '@nestjs/common';
import { FieldOptions } from '@nestjs/graphql';
import { StringField } from './string.field';

export function NameField(options?: FieldOptions) {
  return applyDecorators(StringField(options));
}
