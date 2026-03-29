import { ObjectType } from '@nestjs/graphql';
import { DateField, format_date } from '@org/shared/date';
import { Appointment } from '@org/shared/db';
import { UuidField } from '@org/shared/fields';

@ObjectType()
export class PreviousAppointmentOutput {
  id: number;
  scheduleId: number;
  patientId: number;

  @UuidField()
  uuid: string;

  @DateField()
  date: string;

  shift: string;
  startTime: string;
  endTime: string;
  status: string;

  static from_model(model: Appointment): PreviousAppointmentOutput {
    const out = new PreviousAppointmentOutput();
    out.id = model.id;
    out.scheduleId = model.schedule_id;
    out.patientId = model.patient_id;
    out.uuid = model.uuid;
    out.date = format_date(model.date as any);
    out.shift = model.shift;
    out.startTime = model.start_time;
    out.endTime = model.end_time;
    out.status = model.status;
    return out;
  }
}
