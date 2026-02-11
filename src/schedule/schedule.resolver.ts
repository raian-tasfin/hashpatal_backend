import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ScheduleSercvice } from './schedule.service';
import { Inject } from '@nestjs/common';
import { DoctorScheduleSyncInput } from './input';
import { SchedulableOutput } from './output/schedulable.output';
import { DoctorProfileOutput } from 'src/doctor/output';

@Resolver()
export class ScheduleResolver {
  constructor(
    @Inject(ScheduleSercvice)
    private readonly _scheduleService: ScheduleSercvice,
  ) {}

  /**
   * Mutations
   */
  @Mutation(() => Boolean)
  async doctor_schedule_sync(
    @Args('data') data: DoctorScheduleSyncInput,
  ): Promise<boolean> {
    return this._scheduleService.doctor_schedule_sync(data);
  }
}

@Resolver(() => DoctorProfileOutput)
export class DoctorScheduleResolver {
  constructor(
    @Inject(ScheduleSercvice)
    private readonly _scheduleService: ScheduleSercvice,
  ) {}

  /**
   * Queries
   */
  @ResolveField(() => SchedulableOutput, { nullable: true })
  async schedule(
    @Parent()
    { id }: DoctorProfileOutput,
  ): Promise<SchedulableOutput | null> {
    const res = await this._scheduleService.get_doctor_schedule(id);
    return res ? res : null;
  }
}
