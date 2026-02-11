import { ObjectType } from '@nestjs/graphql';
import { User } from '@org/shared/db';
import { IntegerField } from '@org/shared/fields';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class SchedulableOutput {
  id: number;
  entityId: number;

  @IntegerField()
  minutesPerSlot: number;

  static from_model(model: User): SchedulableOutput {
    return plainToInstance(SchedulableOutput, model);
  }
}
