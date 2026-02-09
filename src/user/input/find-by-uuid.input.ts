import { InputType } from '@nestjs/graphql';
import { UuidField } from '@org/shared/fields';

@InputType()
export class FindByUuidInput {
  @UuidField()
  uuid: string;
}
