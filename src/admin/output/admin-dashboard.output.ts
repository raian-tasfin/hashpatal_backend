import { ObjectType } from '@nestjs/graphql';
import { IntegerField } from '@org/shared/fields';

@ObjectType()
export class AdminDashboardOutput {
  @IntegerField()
  count_active_doctors: number;

  @IntegerField()
  count_scheduled_appointments: number;

  @IntegerField()
  count_completed_appointments_today: number;

  static from_model(model: {
    count_active_doctors: number;
    count_scheduled_appointments: number;
    count_completed_appointments_today: number;
  }): AdminDashboardOutput {
    const out = new AdminDashboardOutput();
    out.count_active_doctors = model.count_active_doctors;
    out.count_scheduled_appointments = model.count_scheduled_appointments;
    out.count_completed_appointments_today =
      model.count_completed_appointments_today;
    return out;
  }
}
