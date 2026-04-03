import { ObjectType } from '@nestjs/graphql';
import { IntegerField } from '@org/shared/fields';

@ObjectType()
export class AdminDashboardOutput {
  @IntegerField()
  count_active_doctors: number;

  @IntegerField()
  count_scheduled_apopintments: number;

  @IntegerField()
  count_completed_apopintments_today: number;

  //   static from_model(model: number): AdminDashboardOutput{
  //     const out = new CountActiveDoctorsOutput();
  //     out.count = model;
  //     return out;
  //   }
}
