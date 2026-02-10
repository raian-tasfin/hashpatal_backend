import { ObjectType } from '@nestjs/graphql';
import { AcademicRecord } from '@org/shared/db';
import { DateField, StringField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class AcademicRecordOutput {
  id: number;
  doctorProfileId: number;

  @StringField()
  degree: string;

  @StringField()
  institute: string;

  @DateField()
  year: string;

  static from_model(model: AcademicRecord): AcademicRecordOutput {
    return plainToInstance(AcademicRecordOutput, model);
  }
}
