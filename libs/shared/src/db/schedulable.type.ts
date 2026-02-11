import { registerEnumType } from '@nestjs/graphql';

export enum Schedulable {
  DOCTOR = 'DOCTOR',
}

registerEnumType(Schedulable, {
  name: 'Schedulable',
});
