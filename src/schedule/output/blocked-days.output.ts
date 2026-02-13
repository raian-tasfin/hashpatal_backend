import { ObjectType } from '@nestjs/graphql';
import { BlockedDays } from '@org/shared/db';
import { DateField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class BlockedDayOutput {
  id: number;

  @DateField()
  date: string;

  static from_model(model: BlockedDays): BlockedDayOutput {
    return plainToInstance(BlockedDayOutput, model);
  }
}
