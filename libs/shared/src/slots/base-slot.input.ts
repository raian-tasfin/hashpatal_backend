import { InputType } from '@nestjs/graphql';
import { ISlot } from './slot.interface';
import { TimeField } from '../fields';

@InputType({ isAbstract: true })
export abstract class BaseSlot implements ISlot {
  abstract key: string;

  @TimeField()
  startTime: string;

  @TimeField()
  endTime: string;
}
