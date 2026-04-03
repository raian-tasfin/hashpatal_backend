// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    String: string,
    Boolean: boolean,
    Int: number,
    Float: number,
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
    name: Scalars['String']
    user_roles: (RoleType[] | null)
    doctor_profile: (DoctorProfileOutput | null)
    __typename: 'UserOutput'
}

export type RoleType = 'ADMIN' | 'DOCTOR' | 'LAB_NURSE' | 'LAB_TECHNICIAN' | 'PATIENT'

export interface AppointmentOutput {
    uuid: Scalars['String']
    date: Scalars['String']
    shift: ShiftType
    startTime: Scalars['String']
    endTime: Scalars['String']
    status: AppointmentStatusType
    patient: (PatientOutput | null)
    complaints: (ComplaintOutput[] | null)
    diagnosis: (DiagnosisOutput[] | null)
    prescription_items: (PrescriptionItemOutput[] | null)
    __typename: 'AppointmentOutput'
}

export type ShiftType = 'MORNING' | 'EVENING'

export type AppointmentStatusType = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'DIDNTSHOW'

export interface AvailableShiftOutput {
    date: Scalars['String']
    shift: ShiftType
    status: Scalars['Boolean']
    start_time: Scalars['String']
    end_time: Scalars['String']
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
    max_booking_days: Scalars['Int']
    available_slots: AvailableSlotOutput[]
    available_shifts: AvailableShiftOutput[]
    __typename: 'ScheduleOutput'
}

export interface MakeAppointmentOutput {
    date: Scalars['String']
    start_time: Scalars['String']
    __typename: 'MakeAppointmentOutput'
}

export interface MeOutput {
    user: UserOutput
    upcoming_appointments: Scalars['Int']
    past_visits: Scalars['Int']
    upcoming_appointment_list: AppointmentOutput[]
    __typename: 'MeOutput'
}

export interface DoctorProfileOutput {
    doctor_name: (Scalars['String'] | null)
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

export interface MyDoctorProfileOutput {
    today_appointment_count: Scalars['Int']
    total_patients: Scalars['Int']
    completed_consultations: Scalars['Int']
    today_appointments: AppointmentOutput[]
    __typename: 'MyDoctorProfileOutput'
}

export interface DepartmentOutput {
    uuid: Scalars['String']
    name: Scalars['String']
    doctors: (UserOutput[] | null)
    __typename: 'DepartmentOutput'
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

export interface ComplaintOutput {
    uuid: Scalars['String']
    name: Scalars['String']
    __typename: 'ComplaintOutput'
}

export interface MedicationOutput {
    uuid: Scalars['String']
    name: Scalars['String']
    generic_name: Scalars['String']
    dose_unit: Scalars['String']
    food_relation: FoodRelationType
    __typename: 'MedicationOutput'
}

export type FoodRelationType = 'BEFORE_EATING' | 'AFTER_EATING' | 'IRRELEVANT'

export interface DiagnosisOutput {
    uuid: Scalars['String']
    name: Scalars['String']
    __typename: 'DiagnosisOutput'
}

export interface PrescriptionItemOutput {
    medication_uuid: Scalars['String']
    medication_name: Scalars['String']
    dose_quantity: Scalars['Float']
    frequency: MedicationFrequencyType
    duration_value: Scalars['Int']
    duration_unit: DurationUnitType
    __typename: 'PrescriptionItemOutput'
}

export type MedicationFrequencyType = 'ONCE_DAILY' | 'TWICE_DAILY' | 'THREE_TIMES_DAILY' | 'FOUR_TIMES_DAILY' | 'EVERY_6_HOURS' | 'EVERY_8_HOURS'

export type DurationUnitType = 'DAYS' | 'WEEKS'

export interface AdminDashboardOutput {
    count_active_doctors: Scalars['Int']
    count_scheduled_appointments: Scalars['Int']
    count_completed_appointments_today: Scalars['Int']
    __typename: 'AdminDashboardOutput'
}

export interface UserListItemOutput {
    uuid: Scalars['String']
    name: Scalars['String']
    email: Scalars['String']
    roles: RoleType[]
    __typename: 'UserListItemOutput'
}

export interface DoctorListItemOutput {
    uuid: Scalars['String']
    name: Scalars['String']
    email: Scalars['String']
    department_uuid: (Scalars['String'] | null)
    department_name: (Scalars['String'] | null)
    __typename: 'DoctorListItemOutput'
}

export interface Query {
    sayHello: Scalars['String']
    me: (MeOutput | null)
    user_find: (UserOutput | null)
    my_doctor_profile: (MyDoctorProfileOutput | null)
    department_fetch_all: (DepartmentOutput[] | null)
    department_find: (DepartmentOutput | null)
    get_my_appointments: AppointmentOutput[]
    get_appointments: AppointmentOutput[]
    get_all_complaints: ComplaintOutput[]
    get_all_diagnosis: DiagnosisOutput[]
    get_all_medication: MedicationOutput[]
    admin_dashboard: AdminDashboardOutput
    admin_get_all_users: UserListItemOutput[]
    admin_get_all_doctors: DoctorListItemOutput[]
    __typename: 'Query'
}

export interface Mutation {
    user_register: Scalars['Boolean']
    user_login: TokenPair
    user_refresh_token: TokenPair
    user_logout: Scalars['Boolean']
    user_sync_roles: Scalars['Boolean']
    doctor_sync_profile: Scalars['Boolean']
    department_add: Scalars['Boolean']
    schedule_sync: Scalars['Boolean']
    routine_sync: Scalars['Boolean']
    make_appointment: (MakeAppointmentOutput | null)
    set_appointment_status: Scalars['Boolean']
    add_complaint: Scalars['Boolean']
    add_appointment_complaint: Scalars['Boolean']
    add_appointment_diagnosis: Scalars['Boolean']
    add_medication: Scalars['Boolean']
    add_prescription_item: Scalars['Boolean']
    complete_consultation: Scalars['Boolean']
    admin_assign_doctor_department: Scalars['Boolean']
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
    name?: boolean | number
    user_roles?: boolean | number
    doctor_profile?: DoctorProfileOutputGenqlSelection
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
    complaints?: ComplaintOutputGenqlSelection
    diagnosis?: DiagnosisOutputGenqlSelection
    prescription_items?: PrescriptionItemOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AvailableShiftOutputGenqlSelection{
    date?: boolean | number
    shift?: boolean | number
    status?: boolean | number
    start_time?: boolean | number
    end_time?: boolean | number
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
    max_booking_days?: boolean | number
    available_slots?: (AvailableSlotOutputGenqlSelection & { __args: {date: Scalars['String']} })
    available_shifts?: AvailableShiftOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MakeAppointmentOutputGenqlSelection{
    date?: boolean | number
    start_time?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MeOutputGenqlSelection{
    user?: UserOutputGenqlSelection
    upcoming_appointments?: boolean | number
    past_visits?: boolean | number
    upcoming_appointment_list?: AppointmentOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DoctorProfileOutputGenqlSelection{
    doctor_name?: boolean | number
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

export interface MyDoctorProfileOutputGenqlSelection{
    today_appointment_count?: boolean | number
    total_patients?: boolean | number
    completed_consultations?: boolean | number
    today_appointments?: AppointmentOutputGenqlSelection
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

export interface ComplaintOutputGenqlSelection{
    uuid?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MedicationOutputGenqlSelection{
    uuid?: boolean | number
    name?: boolean | number
    generic_name?: boolean | number
    dose_unit?: boolean | number
    food_relation?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiagnosisOutputGenqlSelection{
    uuid?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PrescriptionItemOutputGenqlSelection{
    medication_uuid?: boolean | number
    medication_name?: boolean | number
    dose_quantity?: boolean | number
    frequency?: boolean | number
    duration_value?: boolean | number
    duration_unit?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AdminDashboardOutputGenqlSelection{
    count_active_doctors?: boolean | number
    count_scheduled_appointments?: boolean | number
    count_completed_appointments_today?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserListItemOutputGenqlSelection{
    uuid?: boolean | number
    name?: boolean | number
    email?: boolean | number
    roles?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DoctorListItemOutputGenqlSelection{
    uuid?: boolean | number
    name?: boolean | number
    email?: boolean | number
    department_uuid?: boolean | number
    department_name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    sayHello?: boolean | number
    me?: MeOutputGenqlSelection
    user_find?: (UserOutputGenqlSelection & { __args: {data: FindUserInput} })
    my_doctor_profile?: MyDoctorProfileOutputGenqlSelection
    department_fetch_all?: DepartmentOutputGenqlSelection
    department_find?: (DepartmentOutputGenqlSelection & { __args: {data: FindDepartmentInput} })
    get_my_appointments?: (AppointmentOutputGenqlSelection & { __args?: {data?: (GetAppointmentsInput | null)} })
    get_appointments?: (AppointmentOutputGenqlSelection & { __args: {data: GetAppointmentsInput} })
    get_all_complaints?: ComplaintOutputGenqlSelection
    get_all_diagnosis?: DiagnosisOutputGenqlSelection
    get_all_medication?: MedicationOutputGenqlSelection
    admin_dashboard?: AdminDashboardOutputGenqlSelection
    admin_get_all_users?: UserListItemOutputGenqlSelection
    admin_get_all_doctors?: DoctorListItemOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FindUserInput {email?: (Scalars['String'] | null),uuid?: (Scalars['String'] | null)}

export interface FindDepartmentInput {uuid: Scalars['String']}

export interface GetAppointmentsInput {scheduleUuid?: (Scalars['String'] | null),patientUuid?: (Scalars['String'] | null),status?: (AppointmentStatusType | null),date?: (Scalars['String'] | null)}

export interface MutationGenqlSelection{
    user_register?: { __args: {data: RegisterInput} }
    user_login?: (TokenPairGenqlSelection & { __args: {data: LoginInput} })
    user_refresh_token?: (TokenPairGenqlSelection & { __args: {data: RefreshLoginInput} })
    user_logout?: { __args: {data: LogoutInput} }
    user_sync_roles?: { __args: {data: SyncRolesInput} }
    doctor_sync_profile?: { __args: {data: SyncProfileInput} }
    department_add?: { __args: {data: AddDepartmentInput} }
    schedule_sync?: { __args: {data: ScheduleSyncInput} }
    routine_sync?: { __args: {data: RoutineSyncInput} }
    make_appointment?: (MakeAppointmentOutputGenqlSelection & { __args: {data: MakeAppointmentInput} })
    set_appointment_status?: { __args: {data: SetAppointmentStatusInput} }
    add_complaint?: { __args: {data: AddComplaintInput} }
    add_appointment_complaint?: { __args: {data: AddAppointmentComplaintInput} }
    add_appointment_diagnosis?: { __args: {data: AddAppointmentDiagnosisInput} }
    add_medication?: { __args: {data: AddMedicationInput} }
    add_prescription_item?: { __args: {data: AddPrescriptionItemInput} }
    complete_consultation?: { __args: {data: CompleteConsultationInput} }
    admin_assign_doctor_department?: { __args: {doctorUuid: Scalars['String'], departmentUuid?: (Scalars['String'] | null)} }
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

export interface MakeAppointmentInput {scheduleUuid: Scalars['String'],date: Scalars['String'],shift: ShiftType}

export interface SetAppointmentStatusInput {uuid: Scalars['String'],status: AppointmentStatusType}

export interface AddComplaintInput {name: Scalars['String']}

export interface AddAppointmentComplaintInput {appointment_uuid: Scalars['String'],complaint_uuid: Scalars['String'],note?: (Scalars['String'] | null),days?: (Scalars['Int'] | null)}

export interface AddAppointmentDiagnosisInput {appointment_uuid: Scalars['String'],diagnosis_uuid: Scalars['String']}

export interface AddMedicationInput {name: Scalars['String'],generic_name: Scalars['String'],dose_unit: Scalars['String'],food_relation: FoodRelationType}

export interface AddPrescriptionItemInput {appointment_uuid: Scalars['String'],medication_uuid: Scalars['String'],dose_quantity: Scalars['Float'],frequency: MedicationFrequencyType,duration_value: Scalars['Int'],duration_unit: DurationUnitType}

export interface CompleteConsultationInput {appointment_uuid: Scalars['String'],complaint_uuids?: (Scalars['String'][] | null),diagnosis_uuids?: (Scalars['String'][] | null),prescription_items?: (PrescriptionItemDetailInput[] | null)}

export interface PrescriptionItemDetailInput {medication_uuid: Scalars['String'],dose_quantity: Scalars['Float'],frequency: MedicationFrequencyType,duration_value: Scalars['Int'],duration_unit: DurationUnitType}


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
    


    const MakeAppointmentOutput_possibleTypes: string[] = ['MakeAppointmentOutput']
    export const isMakeAppointmentOutput = (obj?: { __typename?: any } | null): obj is MakeAppointmentOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMakeAppointmentOutput"')
      return MakeAppointmentOutput_possibleTypes.includes(obj.__typename)
    }
    


    const MeOutput_possibleTypes: string[] = ['MeOutput']
    export const isMeOutput = (obj?: { __typename?: any } | null): obj is MeOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMeOutput"')
      return MeOutput_possibleTypes.includes(obj.__typename)
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
    


    const MyDoctorProfileOutput_possibleTypes: string[] = ['MyDoctorProfileOutput']
    export const isMyDoctorProfileOutput = (obj?: { __typename?: any } | null): obj is MyDoctorProfileOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMyDoctorProfileOutput"')
      return MyDoctorProfileOutput_possibleTypes.includes(obj.__typename)
    }
    


    const DepartmentOutput_possibleTypes: string[] = ['DepartmentOutput']
    export const isDepartmentOutput = (obj?: { __typename?: any } | null): obj is DepartmentOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDepartmentOutput"')
      return DepartmentOutput_possibleTypes.includes(obj.__typename)
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
    


    const ComplaintOutput_possibleTypes: string[] = ['ComplaintOutput']
    export const isComplaintOutput = (obj?: { __typename?: any } | null): obj is ComplaintOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isComplaintOutput"')
      return ComplaintOutput_possibleTypes.includes(obj.__typename)
    }
    


    const MedicationOutput_possibleTypes: string[] = ['MedicationOutput']
    export const isMedicationOutput = (obj?: { __typename?: any } | null): obj is MedicationOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedicationOutput"')
      return MedicationOutput_possibleTypes.includes(obj.__typename)
    }
    


    const DiagnosisOutput_possibleTypes: string[] = ['DiagnosisOutput']
    export const isDiagnosisOutput = (obj?: { __typename?: any } | null): obj is DiagnosisOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDiagnosisOutput"')
      return DiagnosisOutput_possibleTypes.includes(obj.__typename)
    }
    


    const PrescriptionItemOutput_possibleTypes: string[] = ['PrescriptionItemOutput']
    export const isPrescriptionItemOutput = (obj?: { __typename?: any } | null): obj is PrescriptionItemOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPrescriptionItemOutput"')
      return PrescriptionItemOutput_possibleTypes.includes(obj.__typename)
    }
    


    const AdminDashboardOutput_possibleTypes: string[] = ['AdminDashboardOutput']
    export const isAdminDashboardOutput = (obj?: { __typename?: any } | null): obj is AdminDashboardOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAdminDashboardOutput"')
      return AdminDashboardOutput_possibleTypes.includes(obj.__typename)
    }
    


    const UserListItemOutput_possibleTypes: string[] = ['UserListItemOutput']
    export const isUserListItemOutput = (obj?: { __typename?: any } | null): obj is UserListItemOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserListItemOutput"')
      return UserListItemOutput_possibleTypes.includes(obj.__typename)
    }
    


    const DoctorListItemOutput_possibleTypes: string[] = ['DoctorListItemOutput']
    export const isDoctorListItemOutput = (obj?: { __typename?: any } | null): obj is DoctorListItemOutput => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDoctorListItemOutput"')
      return DoctorListItemOutput_possibleTypes.includes(obj.__typename)
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

export const enumFoodRelationType = {
   BEFORE_EATING: 'BEFORE_EATING' as const,
   AFTER_EATING: 'AFTER_EATING' as const,
   IRRELEVANT: 'IRRELEVANT' as const
}

export const enumMedicationFrequencyType = {
   ONCE_DAILY: 'ONCE_DAILY' as const,
   TWICE_DAILY: 'TWICE_DAILY' as const,
   THREE_TIMES_DAILY: 'THREE_TIMES_DAILY' as const,
   FOUR_TIMES_DAILY: 'FOUR_TIMES_DAILY' as const,
   EVERY_6_HOURS: 'EVERY_6_HOURS' as const,
   EVERY_8_HOURS: 'EVERY_8_HOURS' as const
}

export const enumDurationUnitType = {
   DAYS: 'DAYS' as const,
   WEEKS: 'WEEKS' as const
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
