import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { Inject } from '@nestjs/common';
import {
  DoctorOverrideRoutineSyncInput,
  DoctorRegularRoutineSyncInput,
  DoctorScheduleSyncInput,
} from './input';
import {
  OverrideRoutineOutput,
  RegularRoutineOutput,
  SchedulableOutput,
} from './output';
import { DoctorProfileOutput } from 'src/doctor/output';

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
  async doctor_schedule_sync(
    @Args('data') data: DoctorScheduleSyncInput,
  ): Promise<boolean> {
    return this._scheduleService.doctor_schedule_sync(data);
  }

  @Mutation(() => Boolean)
  async doctor_schedule_regular_slots_sync(
    @Args('data') data: DoctorRegularRoutineSyncInput,
  ): Promise<boolean> {
    return this._scheduleService.doctor_regular_routine_sync(data);
  }

  @Mutation(() => Boolean)
  async doctor_schedule_override_slots_sync(
    @Args('data') data: DoctorOverrideRoutineSyncInput,
  ): Promise<boolean> {
    return this._scheduleService.doctor_override_routine_sync(data);
  }
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
  @ResolveField(() => SchedulableOutput, { nullable: true })
  async schedule(
    @Parent()
    { id }: DoctorProfileOutput,
  ): Promise<SchedulableOutput | null> {
    const res = await this._scheduleService.get_doctor_schedule(id);
    return res ? res : null;
  }
}

@Resolver(() => SchedulableOutput)
export class SchedulableResolver {
  constructor(
    @Inject(ScheduleService)
    private readonly _scheduleService: ScheduleService,
  ) {}

  @ResolveField(() => [RegularRoutineOutput], { nullable: true })
  async regular_routine(@Parent() { id }: SchedulableOutput) {
    const res = await this._scheduleService.get_doctor_regular_slots(id);
    return res.map((r) => RegularRoutineOutput.from_model(r));
  }

  @ResolveField(() => [OverrideRoutineOutput], { nullable: true })
  async override_routine(@Parent() { id }: SchedulableOutput) {
    const res = await this._scheduleService.get_doctor_override_slots(id);
    return res.map((r) => OverrideRoutineOutput.from_model(r));
  }
}
