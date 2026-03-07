import { ObjectType } from '@nestjs/graphql';
import { DateField } from '@org/shared/date';
import { AcademicRecord } from '@org/shared/db';
import { StringField } from '@org/shared/fields';
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
