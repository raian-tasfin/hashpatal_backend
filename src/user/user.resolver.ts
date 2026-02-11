import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoleType } from '@org/shared/db';
import {
  FindByEmailInput,
  LoginInput,
  LogoutInput,
  RefreshLoginInput,
  RegisterInput,
  SyncRolesInput,
} from './input';
import { TokenPair, UserOutput } from './output';
import { UserService } from './user.service';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
  ) {}

  /**
   * Mutations
   */
  @Mutation(() => UserOutput)
  async user_register(@Args('data') data: RegisterInput): Promise<UserOutput> {
    const user = await this._userService.register(data);
    return UserOutput.from_model(user);
  }

  @Mutation(() => TokenPair)
  async user_login(@Args('data') data: LoginInput): Promise<TokenPair> {
    return this._userService.login(data);
  }

  @Mutation(() => TokenPair)
  async user_refresh_token(
    @Args('data') data: RefreshLoginInput,
  ): Promise<TokenPair> {
    return this._userService.refresh(data);
  }

  @Mutation(() => Boolean)
  async user_logout(@Args('data') data: LogoutInput): Promise<boolean> {
    await this._userService.logout(data);
    return true;
  }

  @Mutation(() => Boolean)
  async user_sync_roles(@Args('data') data: SyncRolesInput): Promise<boolean> {
    await this._userService.sync_roles(data);
    return true;
  }

  /**
   * Queries
   */
  @Query(() => UserOutput)
  async user_find(
    @Args('data') data: FindByEmailInput,
  ): Promise<UserOutput | undefined> {
    const user = await this._userService.find_by_email(data);
    return user ? UserOutput.from_model(user) : undefined;
  }

  @ResolveField(() => [RoleType])
  async user_roles(@Parent() user: UserOutput): Promise<RoleType[]> {
    return (this._userService as any)._find_roles(user.id);
  }
}
