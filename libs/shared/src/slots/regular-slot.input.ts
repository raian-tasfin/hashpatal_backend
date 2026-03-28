import { InputType } from '@nestjs/graphql';
import { BaseSlot } from './base-slot.input';
import { WeekDayField } from '../fields';
import { WeekDayType } from '../db';

@InputType()
export class RoutineSlotInput extends BaseSlot {
  @WeekDayField()
  weekDay: WeekDayType;

  get key(): string {
    return this.weekDay;
  }

  set key(val: string) {
    this.weekDay = val as WeekDayType;
  }
}
