import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  LAB_NURSE = 'LAB_NURSE',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  PATIENT = 'PATIENT',
}

registerEnumType(Role, {
  name: 'Role',
});
