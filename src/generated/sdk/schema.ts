// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    String: string,
    Int: number,
    Boolean: boolean,
}

export interface TokenPair {
    accessToken: Scalars['String']
    refreshToken: Scalars['String']
    __typename: 'TokenPair'
}

export interface UserOutput {
    uuid: Scalars['String']
    email: Scalars['String']
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
    startYear: Scalars['String']
    endYear: Scalars['String']
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

export interface BlockedDayOutput {
    date: Scalars['String']
    __typename: 'BlockedDayOutput'
}

export interface OverrideRoutineOutput {
    date: Scalars['String']
    shift: ShiftType
    startTime: Scalars['String']
    endTime: Scalars['String']
    __typename: 'OverrideRoutineOutput'
}

export type ShiftType = 'MORNING' | 'EVENING'

export interface RegularRoutineOutput {
    weekDay: WeekDayType
    shift: ShiftType
    startTime: Scalars['String']
    endTime: Scalars['String']
    __typename: 'RegularRoutineOutput'
}

export type WeekDayType = 'SATURDAY' | 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'

export interface ScheduleOutput {
    minutesPerSlot: Scalars['Int']
    maxBookingDays: Scalars['Int']
    regular_routine: (RegularRoutineOutput[] | null)
    override_routine: (OverrideRoutineOutput[] | null)
    blocked_days: (BlockedDayOutput[] | null)
    available_slots: (OverrideRoutineOutput[] | null)
    __typename: 'ScheduleOutput'
}

export interface Query {
    sayHello: Scalars['String']
    user_find: UserOutput
    __typename: 'Query'
}

export interface Mutation {
    user_register: UserOutput
    user_login: TokenPair
    user_refresh_token: TokenPair
    user_logout: Scalars['Boolean']
    user_sync_roles: Scalars['Boolean']
    doctor_sync_profile: Scalars['Boolean']
    doctor_schedule_sync: Scalars['Boolean']
    doctor_schedule_regular_slots_sync: Scalars['Boolean']
    doctor_schedule_override_slots_sync: Scalars['Boolean']
    doctor_blocked_days_add: Scalars['Boolean']
    doctor_blocked_days_remove: Scalars['Boolean']
    __typename: 'Mutation'
}

export interface TokenPairGenqlSelection{
    accessToken?: boolean | number
    refreshToken?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserOutputGenqlSelection{
    uuid?: boolean | number
    email?: boolean | number
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

export interface BlockedDayOutputGenqlSelection{
    date?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OverrideRoutineOutputGenqlSelection{
    date?: boolean | number
    shift?: boolean | number
    startTime?: boolean | number
    endTime?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RegularRoutineOutputGenqlSelection{
    weekDay?: boolean | number
    shift?: boolean | number
    startTime?: boolean | number
    endTime?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScheduleOutputGenqlSelection{
    minutesPerSlot?: boolean | number
    maxBookingDays?: boolean | number
    regular_routine?: RegularRoutineOutputGenqlSelection
    override_routine?: OverrideRoutineOutputGenqlSelection
    blocked_days?: BlockedDayOutputGenqlSelection
    available_slots?: OverrideRoutineOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    sayHello?: boolean | number
    user_find?: (UserOutputGenqlSelection & { __args: {data: FindByEmailInput} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FindByEmailInput {email: Scalars['String']}

export interface MutationGenqlSelection{
    user_register?: (UserOutputGenqlSelection & { __args: {data: RegisterInput} })
    user_login?: (TokenPairGenqlSelection & { __args: {data: LoginInput} })
    user_refresh_token?: (TokenPairGenqlSelection & { __args: {data: RefreshLoginInput} })
    user_logout?: { __args: {data: LogoutInput} }
    user_sync_roles?: { __args: {data: SyncRolesInput} }
    doctor_sync_profile?: boolean | number
    doctor_schedule_sync?: { __args: {data: DoctorScheduleSyncInput} }
    doctor_schedule_regular_slots_sync?: { __args: {data: DoctorRegularRoutineSyncInput} }
    doctor_schedule_override_slots_sync?: { __args: {data: DoctorOverrideRoutineSyncInput} }
    doctor_blocked_days_add?: { __args: {data: DoctorBlockedDaysAddInput} }
    doctor_blocked_days_remove?: { __args: {data: DoctorBlockedDaysRemoveInput} }
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RegisterInput {email: Scalars['String'],name: Scalars['String'],password: Scalars['String'],birthDate: Scalars['String']}

export interface LoginInput {email: Scalars['String'],password: Scalars['String']}

export interface RefreshLoginInput {refreshToken: Scalars['String']}

export interface LogoutInput {refreshToken: Scalars['String']}

export interface SyncRolesInput {email: Scalars['String'],roles: RoleType[]}

export interface DoctorScheduleSyncInput {email: Scalars['String'],minutesPerSlot: Scalars['Int'],maxBookingDays: Scalars['Int']}

export interface DoctorRegularRoutineSyncInput {email: Scalars['String'],slots: RegularSlotInput[]}

export interface RegularSlotInput {shift: ShiftType,startTime: Scalars['String'],endTime: Scalars['String'],weekDay: WeekDayType}

export interface DoctorOverrideRoutineSyncInput {email: Scalars['String'],slots: OverrideSlotInput[]}

export interface OverrideSlotInput {shift: ShiftType,startTime: Scalars['String'],endTime: Scalars['String'],date: Scalars['String']}

export interface DoctorBlockedDaysAddInput {email: Scalars['String'],dates: Scalars['String'][]}

export interface DoctorBlockedDaysRemoveInput {email: Scalars['String'],dates: Scalars['String'][]}


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
    


    const BlockedDayOutput_possibleTypes: string[] = ['BlockedDayOutput']
    export const isBlockedDayOutput = (obj?: { __typename?: any } | null): obj is BlockedDayOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBlockedDayOutput"')
      return BlockedDayOutput_possibleTypes.includes(obj.__typename)
    }
    


    const OverrideRoutineOutput_possibleTypes: string[] = ['OverrideRoutineOutput']
    export const isOverrideRoutineOutput = (obj?: { __typename?: any } | null): obj is OverrideRoutineOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOverrideRoutineOutput"')
      return OverrideRoutineOutput_possibleTypes.includes(obj.__typename)
    }
    


    const RegularRoutineOutput_possibleTypes: string[] = ['RegularRoutineOutput']
    export const isRegularRoutineOutput = (obj?: { __typename?: any } | null): obj is RegularRoutineOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRegularRoutineOutput"')
      return RegularRoutineOutput_possibleTypes.includes(obj.__typename)
    }
    


    const ScheduleOutput_possibleTypes: string[] = ['ScheduleOutput']
    export const isScheduleOutput = (obj?: { __typename?: any } | null): obj is ScheduleOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScheduleOutput"')
      return ScheduleOutput_possibleTypes.includes(obj.__typename)
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

export const enumWeekDayType = {
   SATURDAY: 'SATURDAY' as const,
   SUNDAY: 'SUNDAY' as const,
   MONDAY: 'MONDAY' as const,
   TUESDAY: 'TUESDAY' as const,
   WEDNESDAY: 'WEDNESDAY' as const,
   THURSDAY: 'THURSDAY' as const,
   FRIDAY: 'FRIDAY' as const
}
