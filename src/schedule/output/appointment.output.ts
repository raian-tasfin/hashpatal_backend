import { ObjectType } from '@nestjs/graphql';
import { DateField, format_date } from '@org/shared/date';
import { Appointment } from '@org/shared/db';
import {
  AppointmentStatusField,
  ShiftField,
  TimeField,
  UuidField,
} from '@org/shared/fields';

@ObjectType()
export class AppointmentOutput {
  id: number;
  schedule_id: number;
  patient_id: number;

  @UuidField()
  uuid: string;

  @DateField()
  date: string;

  @ShiftField()
  shift: string;

  @TimeField()
  startTime: string;

  @TimeField()
  endTime: string;

  @AppointmentStatusField()
  status: string;

  static from_model(model: Appointment): AppointmentOutput {
    const out = new AppointmentOutput();
    out.id = model.id;
    out.schedule_id = model.schedule_id;
    out.patient_id = model.patient_id;
    out.uuid = model.uuid;
    out.date = format_date(model.date as any);
    out.shift = model.shift;
    out.startTime = model.start_time;
    out.endTime = model.end_time;
    out.status = model.status;
    return out;
  }
}
