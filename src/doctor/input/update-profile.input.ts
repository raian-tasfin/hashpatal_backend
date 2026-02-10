import { InputType } from '@nestjs/graphql';
import {
  AcademicRecordField,
  AcademicRecordInput,
  EmailField,
  ExperienceField,
  ExperienceInput,
} from '@org/shared/fields';

@InputType()
export class UpdateProfileInput {
  @EmailField()
  email: string;

  @ExperienceField()
  experience: ExperienceInput[];

  @AcademicRecordField()
  academic: AcademicRecordInput[];
}
