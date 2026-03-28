import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { Inject, Logger } from '@nestjs/common';
import { ScheduleOutput } from './output';
import { DoctorProfileOutput } from 'src/doctor/output';
import { RoutineSyncInput, ScheduleSyncInput } from './input';

@Resolver()
export class ScheduleResolver {
  constructor(
    @Inject(ScheduleService)
    private readonly _scheduleService: ScheduleService,
  ) {}

  /**
   * Mutations
   */
  @Mutation(() => Boolean)
  async schedule_sync(@Args('data') data: ScheduleSyncInput): Promise<boolean> {
    return await this._scheduleService.schedule_sync(data);
  }

  @Mutation(() => Boolean)
  async routine_sync(@Args('data') data: RoutineSyncInput): Promise<boolean> {
    return await this._scheduleService.routine_sync(data);
  }

  // @Mutation(() => Boolean)
  // async doctor_schedule_regular_slots_sync(
  //   @Args('data') data: DoctorRegularRoutineSyncInput,
  // ): Promise<boolean> {
  //   return await this._scheduleService.doctor_regular_routine_sync(data);
  // }
  //
  // @Mutation(() => Boolean)
  // async doctor_schedule_override_slots_sync(
  //   @Args('data') data: DoctorOverrideRoutineSyncInput,
  // ): Promise<boolean> {
  //   return await this._scheduleService.doctor_override_routine_sync(data);
  // }
  //
  // @Mutation(() => Boolean)
  // async doctor_blocked_days_add(
  //   @Args('data') data: DoctorBlockedDaysAddInput,
  // ): Promise<boolean> {
  //   return await this._scheduleService.doctor_blocked_days_add(data);
  // }
  //
  // @Mutation(() => Boolean)
  // async doctor_blocked_days_remove(
  //   @Args('data') data: DoctorBlockedDaysRemoveInput,
  // ): Promise<boolean> {
  //   return await this._scheduleService.doctor_blocked_days_remove(data);
  // }
}

@Resolver(() => DoctorProfileOutput)
export class DoctorScheduleResolver {
  constructor(
    @Inject(ScheduleService)
    private readonly _scheduleService: ScheduleService,
  ) {}

  /**
   * Queries
   */
  @ResolveField(() => ScheduleOutput, { nullable: true })
  async schedule(
    @Parent()
    { scheduleId }: DoctorProfileOutput,
  ): Promise<ScheduleOutput | null> {
    const res = await this._scheduleService.get_schedule_from_id(scheduleId);
    return res ? ScheduleOutput.from_model(res) : null;
  }
}

@Resolver(() => ScheduleOutput)
export class SchedulableResolver {
  private readonly logger = new Logger(SchedulableResolver.name);

  constructor(
    @Inject(ScheduleService)
    private readonly _scheduleService: ScheduleService,
  ) {}
  //
  //   @ResolveField(() => [RegularRoutineOutput], { nullable: true })
  //   async regular_routine(@Parent() { id }: ScheduleOutput) {
  //     const res = await this._scheduleService.get_regular_slots(id);
  //     return res.map(RegularRoutineOutput.from_model);
  //   }
  //
  //   @ResolveField(() => [OverrideRoutineOutput], { nullable: true })
  //   async override_routine(@Parent() { id }: ScheduleOutput) {
  //     const res = await this._scheduleService.get_override_slots(id);
  //     this.logger.log(res);
  //     return res.map(OverrideRoutineOutput.from_model);
  //   }
  //
  //   @ResolveField(() => [BlockedDayOutput], { nullable: true })
  //   async blocked_days(@Parent() { id }: ScheduleOutput) {
  //     const res = await this._scheduleService.get_blocked_days(id);
  //     return res.map(BlockedDayOutput.from_model);
  //   }
  //
  //   @ResolveField(() => [OverrideRoutineOutput], { nullable: true })
  //   async available_slots(@Parent() { id }: ScheduleOutput) {
  //     const res = await this._scheduleService.get_available_show_slots(id);
  //     return res.map(OverrideRoutineOutput.from_model);
  //   }
}
