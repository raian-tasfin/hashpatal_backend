import { ObjectType } from '@nestjs/graphql';
import { DateField, format_date } from '@org/shared/date';
import { User } from '@org/shared/db';
import { IntegerField, NameField, UuidField } from '@org/shared/fields';
import { differenceInYears } from 'date-fns';

@ObjectType()
export class PatientOutput {
  id: number;

  @NameField()
  name: string;

  @UuidField()
  uuid: string;

  @DateField()
  birthDate: string;

  @IntegerField()
  age: number;

  static from_model(model: User): PatientOutput {
    const out = new PatientOutput();
    out.id = model.id;
    out.uuid = model.uuid;
    out.name = model.name;
    out.birthDate = format_date(model.birth_date as any);
    out.age = differenceInYears(new Date(), model.birth_date);
    return out;
  }
}
