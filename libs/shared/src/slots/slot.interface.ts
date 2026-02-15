import { ShiftType } from '../db';

export interface ISlot {
  key: string;
  shift: ShiftType;
  startTime: string;
  endTime: string;
}
