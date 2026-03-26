import { InputType } from '@nestjs/graphql';
import {
  AcademicRecordField,
  AcademicRecordInput,
  ExperienceField,
  ExperienceInput,
  UuidField,
} from '@org/shared/fields';

@InputType()
export class SyncProfileInput {
  @UuidField()
  uuid: string;

  @UuidField({ nullable: true })
  departmentUuid?: string;

  @ExperienceField({ isArray: true })
  experience: ExperienceInput[];

  @AcademicRecordField({ isArray: true })
  academic: AcademicRecordInput[];
}
