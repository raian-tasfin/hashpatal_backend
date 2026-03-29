// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    String: string,
    Boolean: boolean,
    Int: number,
}

export interface TokenPair {
    accessToken: Scalars['String']
    refreshToken: Scalars['String']
    __typename: 'TokenPair'
}

export interface UserOutput {
    uuid: Scalars['String']
    email: Scalars['String']
    birthDate: Scalars['String']
    user_roles: RoleType[]
    doctor_profile: (DoctorProfileOutput | null)
    __typename: 'UserOutput'
}

export type RoleType = 'ADMIN' | 'DOCTOR' | 'LAB_NURSE' | 'LAB_TECHNICIAN' | 'PATIENT'

export interface DoctorProfileOutput {
    experience: (DoctorExperienceOutput[] | null)
    academic_record: (AcademicRecordOutput[] | null)
    schedule: (ScheduleOutput | null)
    __typename: 'DoctorProfileOutput'
}

export interface DoctorExperienceOutput {
    startYear: (Scalars['String'] | null)
    endYear: (Scalars['String'] | null)
    location: Scalars['String']
    organization: Scalars['String']
    title: Scalars['String']
    __typename: 'DoctorExperienceOutput'
}

export interface AcademicRecordOutput {
    degree: Scalars['String']
    institute: Scalars['String']
    year: Scalars['String']
    __typename: 'AcademicRecordOutput'
}

export interface DepartmentOutput {
    uuid: Scalars['String']
    name: Scalars['String']
    doctors: (UserOutput[] | null)
    __typename: 'DepartmentOutput'
}

export interface AppointmentOutput {
    uuid: Scalars['String']
    date: Scalars['String']
    shift: ShiftType
    startTime: Scalars['String']
    endTime: Scalars['String']
    status: AppointmentStatusType
    patient: (PatientOutput | null)
    __typename: 'AppointmentOutput'
}

export type ShiftType = 'MORNING' | 'EVENING'

export type AppointmentStatusType = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'DIDNTSHOW'

export interface AvailableShiftOutput {
    date: Scalars['String']
    shift: ShiftType
    status: Scalars['Boolean']
    __typename: 'AvailableShiftOutput'
}

export interface AvailableSlotOutput {
    shift: ShiftType
    startTime: Scalars['String']
    endTime: Scalars['String']
    __typename: 'AvailableSlotOutput'
}

export interface ScheduleOutput {
    uuid: Scalars['String']
    minutes_per_slot: Scalars['Int']
    max_booking_days: Scalars['Int']
    available_slots: AvailableSlotOutput[]
    available_shifts: AvailableShiftOutput[]
    __typename: 'ScheduleOutput'
}

export interface PatientOutput {
    name: Scalars['String']
    uuid: Scalars['String']
    birthDate: Scalars['String']
    age: Scalars['Int']
    previous_appointments: (PreviousAppointmentOutput[] | null)
    __typename: 'PatientOutput'
}

export interface PreviousAppointmentOutput {
    uuid: Scalars['String']
    date: Scalars['String']
    __typename: 'PreviousAppointmentOutput'
}

export interface Query {
    sayHello: Scalars['String']
    user_find: (UserOutput | null)
    department_fetch_all: (DepartmentOutput[] | null)
    department_find: (DepartmentOutput | null)
    get_appointments: AppointmentOutput[]
    __typename: 'Query'
}

export interface Mutation {
    user_register: UserOutput
    user_login: TokenPair
    user_refresh_token: TokenPair
    user_logout: Scalars['Boolean']
    user_sync_roles: Scalars['Boolean']
    doctor_sync_profile: Scalars['Boolean']
    department_add: Scalars['Boolean']
    schedule_sync: Scalars['Boolean']
    routine_sync: Scalars['Boolean']
    __typename: 'Mutation'
}

export type SchedulableType = 'DOCTOR'

export type WeekDayType = 'SATURDAY' | 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'

export interface TokenPairGenqlSelection{
    accessToken?: boolean | number
    refreshToken?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserOutputGenqlSelection{
    uuid?: boolean | number
    email?: boolean | number
    birthDate?: boolean | number
    user_roles?: boolean | number
    doctor_profile?: DoctorProfileOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DoctorProfileOutputGenqlSelection{
    experience?: DoctorExperienceOutputGenqlSelection
    academic_record?: AcademicRecordOutputGenqlSelection
    schedule?: ScheduleOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DoctorExperienceOutputGenqlSelection{
    startYear?: boolean | number
    endYear?: boolean | number
    location?: boolean | number
    organization?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AcademicRecordOutputGenqlSelection{
    degree?: boolean | number
    institute?: boolean | number
    year?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DepartmentOutputGenqlSelection{
    uuid?: boolean | number
    name?: boolean | number
    doctors?: UserOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AppointmentOutputGenqlSelection{
    uuid?: boolean | number
    date?: boolean | number
    shift?: boolean | number
    startTime?: boolean | number
    endTime?: boolean | number
    status?: boolean | number
    patient?: PatientOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AvailableShiftOutputGenqlSelection{
    date?: boolean | number
    shift?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AvailableSlotOutputGenqlSelection{
    shift?: boolean | number
    startTime?: boolean | number
    endTime?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScheduleOutputGenqlSelection{
    uuid?: boolean | number
    minutes_per_slot?: boolean | number
    max_booking_days?: boolean | number
    available_slots?: (AvailableSlotOutputGenqlSelection & { __args: {date: Scalars['String']} })
    available_shifts?: AvailableShiftOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PatientOutputGenqlSelection{
    name?: boolean | number
    uuid?: boolean | number
    birthDate?: boolean | number
    age?: boolean | number
    previous_appointments?: PreviousAppointmentOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PreviousAppointmentOutputGenqlSelection{
    uuid?: boolean | number
    date?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    sayHello?: boolean | number
    user_find?: (UserOutputGenqlSelection & { __args: {data: FindUserInput} })
    department_fetch_all?: DepartmentOutputGenqlSelection
    department_find?: (DepartmentOutputGenqlSelection & { __args: {data: FindDepartmentInput} })
    get_appointments?: (AppointmentOutputGenqlSelection & { __args: {data: GetAppointmentsInput} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FindUserInput {email?: (Scalars['String'] | null),uuid?: (Scalars['String'] | null)}

export interface FindDepartmentInput {uuid: Scalars['String']}

export interface GetAppointmentsInput {scheduleUuid?: (Scalars['String'] | null),patientUuid?: (Scalars['String'] | null),status?: (AppointmentStatusType | null),date?: (Scalars['String'] | null)}

export interface MutationGenqlSelection{
    user_register?: (UserOutputGenqlSelection & { __args: {data: RegisterInput} })
    user_login?: (TokenPairGenqlSelection & { __args: {data: LoginInput} })
    user_refresh_token?: (TokenPairGenqlSelection & { __args: {data: RefreshLoginInput} })
    user_logout?: { __args: {data: LogoutInput} }
    user_sync_roles?: { __args: {data: SyncRolesInput} }
    doctor_sync_profile?: { __args: {data: SyncProfileInput} }
    department_add?: { __args: {data: AddDepartmentInput} }
    schedule_sync?: { __args: {data: ScheduleSyncInput} }
    routine_sync?: { __args: {data: RoutineSyncInput} }
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RegisterInput {email: Scalars['String'],name: Scalars['String'],password: Scalars['String'],birthDate: Scalars['String']}

export interface LoginInput {email: Scalars['String'],password: Scalars['String']}

export interface RefreshLoginInput {refreshToken: Scalars['String']}

export interface LogoutInput {refreshToken: Scalars['String']}

export interface SyncRolesInput {uuid: Scalars['String'],roles: RoleType[]}

export interface SyncProfileInput {uuid: Scalars['String'],departmentUuid?: (Scalars['String'] | null),experience: ExperienceInput[],academic: AcademicRecordInput[]}

export interface ExperienceInput {title: Scalars['String'],organization: Scalars['String'],location?: (Scalars['String'] | null),startYear: Scalars['String'],endYear?: (Scalars['String'] | null)}

export interface AcademicRecordInput {degree: Scalars['String'],institute: Scalars['String'],year: Scalars['String']}

export interface AddDepartmentInput {name: Scalars['String']}

export interface ScheduleSyncInput {entityUuid: Scalars['String'],schedulable: SchedulableType,minutes_per_slot: Scalars['Int'],max_booking_days: Scalars['Int']}

export interface RoutineSyncInput {entityUuid: Scalars['String'],schedulable: SchedulableType,slots: RoutineSlotInput[]}

export interface RoutineSlotInput {shift: ShiftType,startTime: Scalars['String'],endTime: Scalars['String'],weekDay: WeekDayType}


    const TokenPair_possibleTypes: string[] = ['TokenPair']
    export const isTokenPair = (obj?: { __typename?: any } | null): obj is TokenPair => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTokenPair"')
      return TokenPair_possibleTypes.includes(obj.__typename)
    }
    


    const UserOutput_possibleTypes: string[] = ['UserOutput']
    export const isUserOutput = (obj?: { __typename?: any } | null): obj is UserOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserOutput"')
      return UserOutput_possibleTypes.includes(obj.__typename)
    }
    


    const DoctorProfileOutput_possibleTypes: string[] = ['DoctorProfileOutput']
    export const isDoctorProfileOutput = (obj?: { __typename?: any } | null): obj is DoctorProfileOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDoctorProfileOutput"')
      return DoctorProfileOutput_possibleTypes.includes(obj.__typename)
    }
    


    const DoctorExperienceOutput_possibleTypes: string[] = ['DoctorExperienceOutput']
    export const isDoctorExperienceOutput = (obj?: { __typename?: any } | null): obj is DoctorExperienceOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDoctorExperienceOutput"')
      return DoctorExperienceOutput_possibleTypes.includes(obj.__typename)
    }
    


    const AcademicRecordOutput_possibleTypes: string[] = ['AcademicRecordOutput']
    export const isAcademicRecordOutput = (obj?: { __typename?: any } | null): obj is AcademicRecordOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAcademicRecordOutput"')
      return AcademicRecordOutput_possibleTypes.includes(obj.__typename)
    }
    


    const DepartmentOutput_possibleTypes: string[] = ['DepartmentOutput']
    export const isDepartmentOutput = (obj?: { __typename?: any } | null): obj is DepartmentOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDepartmentOutput"')
      return DepartmentOutput_possibleTypes.includes(obj.__typename)
    }
    


    const AppointmentOutput_possibleTypes: string[] = ['AppointmentOutput']
    export const isAppointmentOutput = (obj?: { __typename?: any } | null): obj is AppointmentOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAppointmentOutput"')
      return AppointmentOutput_possibleTypes.includes(obj.__typename)
    }
    


    const AvailableShiftOutput_possibleTypes: string[] = ['AvailableShiftOutput']
    export const isAvailableShiftOutput = (obj?: { __typename?: any } | null): obj is AvailableShiftOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAvailableShiftOutput"')
      return AvailableShiftOutput_possibleTypes.includes(obj.__typename)
    }
    


    const AvailableSlotOutput_possibleTypes: string[] = ['AvailableSlotOutput']
    export const isAvailableSlotOutput = (obj?: { __typename?: any } | null): obj is AvailableSlotOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAvailableSlotOutput"')
      return AvailableSlotOutput_possibleTypes.includes(obj.__typename)
    }
    


    const ScheduleOutput_possibleTypes: string[] = ['ScheduleOutput']
    export const isScheduleOutput = (obj?: { __typename?: any } | null): obj is ScheduleOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScheduleOutput"')
      return ScheduleOutput_possibleTypes.includes(obj.__typename)
    }
    


    const PatientOutput_possibleTypes: string[] = ['PatientOutput']
    export const isPatientOutput = (obj?: { __typename?: any } | null): obj is PatientOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPatientOutput"')
      return PatientOutput_possibleTypes.includes(obj.__typename)
    }
    


    const PreviousAppointmentOutput_possibleTypes: string[] = ['PreviousAppointmentOutput']
    export const isPreviousAppointmentOutput = (obj?: { __typename?: any } | null): obj is PreviousAppointmentOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPreviousAppointmentOutput"')
      return PreviousAppointmentOutput_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    

export const enumRoleType = {
   ADMIN: 'ADMIN' as const,
   DOCTOR: 'DOCTOR' as const,
   LAB_NURSE: 'LAB_NURSE' as const,
   LAB_TECHNICIAN: 'LAB_TECHNICIAN' as const,
   PATIENT: 'PATIENT' as const
}

export const enumShiftType = {
   MORNING: 'MORNING' as const,
   EVENING: 'EVENING' as const
}

export const enumAppointmentStatusType = {
   SCHEDULED: 'SCHEDULED' as const,
   COMPLETED: 'COMPLETED' as const,
   CANCELLED: 'CANCELLED' as const,
   DIDNTSHOW: 'DIDNTSHOW' as const
}

export const enumSchedulableType = {
   DOCTOR: 'DOCTOR' as const
}

export const enumWeekDayType = {
   SATURDAY: 'SATURDAY' as const,
   SUNDAY: 'SUNDAY' as const,
   MONDAY: 'MONDAY' as const,
   TUESDAY: 'TUESDAY' as const,
   WEDNESDAY: 'WEDNESDAY' as const,
   THURSDAY: 'THURSDAY' as const,
   FRIDAY: 'FRIDAY' as const
}
