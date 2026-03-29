import { ObjectType } from '@nestjs/graphql';
import { DateField, format_date } from '@org/shared/date';
import { Appointment } from '@org/shared/db';
import { UuidField } from '@org/shared/fields';

@ObjectType()
export class PreviousAppointmentOutput {
  id: number;
  schedule_id: number;
  patient_id: number;

  @UuidField()
  uuid: string;

  @DateField()
  date: string;

  static from_model(model: Appointment): PreviousAppointmentOutput {
    const out = new PreviousAppointmentOutput();
    out.id = model.id;
    out.schedule_id = model.schedule_id;
    out.patient_id = model.patient_id;
    out.uuid = model.uuid;
    out.date = format_date(model.date as any);
    return out;
  }
}
