import { ObjectType } from '@nestjs/graphql';
import { DateField } from '@org/shared/fields';

@ObjectType()
export class AvailableDayOutput {
  @DateField()
  date: string;

  static from_model(date: string): AvailableDayOutput {
    const entity = new AvailableDayOutput();
    entity.date = date;
    return entity;
  }
}
