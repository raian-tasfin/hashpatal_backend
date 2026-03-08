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
    __typename: 'UserOutput'
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
    __typename: 'Mutation'
}

export type RoleType = 'ADMIN' | 'DOCTOR' | 'LAB_NURSE' | 'LAB_TECHNICIAN' | 'PATIENT'

export interface TokenPairGenqlSelection{
    accessToken?: boolean | number
    refreshToken?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserOutputGenqlSelection{
    uuid?: boolean | number
    email?: boolean | number
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
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RegisterInput {email: Scalars['String'],name: Scalars['String'],password: Scalars['String'],birthDate: Scalars['String']}

export interface LoginInput {email: Scalars['String'],password: Scalars['String']}

export interface RefreshLoginInput {refreshToken: Scalars['String']}

export interface LogoutInput {refreshToken: Scalars['String']}

export interface SyncRolesInput {uuid: Scalars['String'],roles: RoleType[]}


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
