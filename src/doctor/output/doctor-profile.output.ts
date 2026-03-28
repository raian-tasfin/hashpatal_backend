import { ObjectType } from '@nestjs/graphql';
import { DoctorProfile } from '@org/shared/db';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class DoctorProfileOutput {
  id: number;
  userId: number;
  scheduleId: number;
  department: number;

  static from_model(model: DoctorProfile): DoctorProfileOutput {
    return plainToInstance(DoctorProfileOutput, model);
  }
}
