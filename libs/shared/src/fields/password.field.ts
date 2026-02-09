import { applyDecorators } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export function PasswordField(minLen = 4) {
  return applyDecorators(
    Field(() => String),
    IsNotEmpty(),
    IsString(),
    MinLength(minLen),
  );
}
