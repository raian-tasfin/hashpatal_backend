// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    String: string,
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
    __typename: 'DepartmentOutput'
}

export interface Query {
    sayHello: Scalars['String']
    user_find: (UserOutput | null)
    department_fetch_all: (DepartmentOutput[] | null)
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
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    sayHello?: boolean | number
    user_find?: (UserOutputGenqlSelection & { __args: {data: FindUserInput} })
    department_fetch_all?: DepartmentOutputGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FindUserInput {email?: (Scalars['String'] | null),uuid?: (Scalars['String'] | null)}

export interface MutationGenqlSelection{
    user_register?: (UserOutputGenqlSelection & { __args: {data: RegisterInput} })
    user_login?: (TokenPairGenqlSelection & { __args: {data: LoginInput} })
    user_refresh_token?: (TokenPairGenqlSelection & { __args: {data: RefreshLoginInput} })
    user_logout?: { __args: {data: LogoutInput} }
    user_sync_roles?: { __args: {data: SyncRolesInput} }
    doctor_sync_profile?: { __args: {data: SyncProfileInput} }
    department_add?: { __args: {data: AddDepartmentInput} }
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
