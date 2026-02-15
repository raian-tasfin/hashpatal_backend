import { InputType } from '@nestjs/graphql';
import { ISlot } from './slot.interface';
import { TimeField } from '../fields';
import { ShiftField } from './shift.field';
import { ShiftType } from '../db';

@InputType({ isAbstract: true })
export abstract class BaseSlot implements ISlot {
  abstract key: string;

  @ShiftField()
  shift: ShiftType;

  @TimeField()
  startTime: string;

  @TimeField()
  endTime: string;
}
