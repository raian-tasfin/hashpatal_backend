import { InputType } from '@nestjs/graphql';
import { BaseSlot } from './base-slot.input';
import { DateField } from '../fields';

@InputType()
export class OverrideSlotInput extends BaseSlot {
  @DateField()
  date: string;

  get key(): string {
    return this.date;
  }

  set key(val: string) {
    this.date = val;
  }
}
