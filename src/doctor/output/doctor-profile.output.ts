import { ObjectType } from '@nestjs/graphql';
import { DoctorProfile } from '@org/shared/db';
import { StringField } from '@org/shared/fields';

@ObjectType()
export class DoctorProfileOutput {
  id: number;
  user_id: number;
  scheduleId: number | null;
  department_id: number | null;

  @StringField({ nullable: true })
  doctor_name?: string;

  static from_model(
    model: DoctorProfile & { doctor_name?: string },
  ): DoctorProfileOutput {
    const out = new DoctorProfileOutput();
    out.id = model.id;
    out.user_id = model.user_id;
    out.scheduleId = model.scheduleId;
    out.department_id = model.department_id;
    out.doctor_name = model.doctor_name;
    return out;
  }
}
