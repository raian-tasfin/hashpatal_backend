import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
  Context,
} from '@nestjs/graphql';
import { SyncProfileInput } from './input';
import {
  AcademicRecordOutput,
  DoctorExperienceOutput,
  DoctorProfileOutput,
} from './output';
import { UserOutput } from 'src/user/output';
import { DoctorService } from './doctor.service';
import { GqlJwtAuthGuard } from '@org/shared/auth';
import { MyDoctorProfileOutput } from './output/my-doctor-profile.output';
import { AppointmentOutput } from 'src/schedule/output';

@Resolver(() => UserOutput)
export class DoctorUserResolver {
  constructor(
    @Inject(DoctorService) private readonly _doctorService: DoctorService,
  ) {}
  /**
   * Mutations
   */
  @Mutation(() => Boolean)
  async doctor_sync_profile(@Args('data') data: SyncProfileInput) {
    await this._doctorService.sync_profile(data);
    return true;
  }

  /**
   * Queries
   */
  @ResolveField(() => DoctorProfileOutput, { nullable: true })
  async doctor_profile(@Parent() user: UserOutput) {
    return await this._doctorService.get_profile(user.id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => MyDoctorProfileOutput, { nullable: true })
  async my_doctor_profile(
    @Context() ctx: any,
  ): Promise<MyDoctorProfileOutput | null> {
    const uuid = ctx.req.user.userId;
    const res = await this._doctorService.my_doctor_profile(uuid);
    if (!res) return null;
    return {
      today_appointment_count: res.today_appointment_count,
      total_patients: res.total_patients,
      completed_consultations: res.completed_consultations,
      today_appointments: res.today_appointments.map(
        AppointmentOutput.from_model,
      ),
    };
  }
}

/**
 * Subfields of DoctorProfile
 */
@Resolver(() => DoctorProfileOutput)
export class DoctorProfileResolver {
  constructor(
    @Inject(DoctorService) private readonly _doctorService: DoctorService,
  ) {}

  @ResolveField(() => [DoctorExperienceOutput], { nullable: true })
  async experience(@Parent() doctorProfile: DoctorProfileOutput) {
    const records = await this._doctorService.get_experience(doctorProfile.id);
    return records.map(DoctorExperienceOutput.from_model);
  }

  @ResolveField(() => [AcademicRecordOutput], { nullable: true })
  async academic_record(@Parent() doctorProfile: DoctorProfileOutput) {
    const records = await this._doctorService.get_academic_record(
      doctorProfile.id,
    );
    return records.map(AcademicRecordOutput.from_model);
  }
}
