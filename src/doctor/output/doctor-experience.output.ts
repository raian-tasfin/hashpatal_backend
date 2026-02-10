import { ObjectType } from '@nestjs/graphql';
import { DoctorExperience, DoctorProfile } from '@org/shared/db';
import { DateField, StringField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class DoctorExperienceOutput {
  doctorProfileId: number;
  id: number;

  @DateField()
  startYear: string;

  @DateField()
  endYear: string;

  @StringField()
  location: string | null;

  @StringField()
  organization: string;

  @StringField()
  title: string;

  static from_model(model: DoctorExperience): DoctorExperienceOutput {
    return plainToInstance(DoctorExperienceOutput, model);
  }
}
