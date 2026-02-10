import { Inject } from '@nestjs/common';
import { Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UpdateProfileInput } from './input';
import {
  AcademicRecordOutput,
  DoctorExperienceOutput,
  DoctorProfileOutput,
} from './output';
import { UserOutput } from 'src/user/output';
import { DoctorService } from './doctor.service';

@Resolver(() => UserOutput)
export class DoctorUserResolver {
  constructor(
    @Inject(DoctorService) private readonly _doctorService: DoctorService,
  ) {}

  /**
   * Mutations
   */
  @Mutation(() => Boolean)
  async doctor_sync_profile(data: UpdateProfileInput) {
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
