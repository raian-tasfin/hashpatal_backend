import { Field, InputType } from '@nestjs/graphql';
import { UuidField } from '@org/shared/fields';
import { PrescriptionItemDetailInput } from './prescription-item-detail.input';
import { is_array, nullable } from '@org/shared/fields/org-field-options.type';
import { isArray } from 'class-validator';
import { PrescriptionItemDetailField } from '@org/shared/fields/prescription-item-detail.field';

@InputType()
export class CompleteConsultationInput {
  @UuidField()
  appointment_uuid: string;

  @UuidField({ nullable: true, isArray: true })
  complaint_uuids?: string[];

  @UuidField({ nullable: true, isArray: true })
  diagnosis_uuids?: string[];

  @PrescriptionItemDetailField({ nullable: true, isArray: true })
  prescription_items?: PrescriptionItemDetailInput[];
}
