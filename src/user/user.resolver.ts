import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoleType } from '@org/shared/db';
import {
  FindByEmailInput,
  FindUserInput,
  LoginInput,
  LogoutInput,
  RefreshLoginInput,
  RegisterInput,
  SyncRolesInput,
} from './input';
import { MeOutput, TokenPair, UserOutput } from './output';
import { UserService } from './user.service';
import { GqlJwtAuthGuard } from '@org/shared/auth';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
  ) {}

  /**
   * Mutations
   */
  @Mutation(() => Boolean)
  async user_register(@Args('data') data: RegisterInput): Promise<boolean> {
    //     return UserOutput.from_model(await this._userService.register(data));
    return await this._userService.register(data);
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
  @UseGuards(GqlJwtAuthGuard)
  @Query(() => MeOutput, { nullable: true })
  async me(@Context() ctx: any): Promise<MeOutput | null> {
    const uuid = ctx.req.user.userId;
    return await this._userService.me(uuid);
  }
  @Query(() => UserOutput, { nullable: true })
  async user_find(
    @Args('data') data: FindUserInput,
  ): Promise<UserOutput | null> {
    const user = await this._userService.find(data);
    return user ? UserOutput.from_model(user) : null;
  }

  @ResolveField(() => [RoleType])
  async user_roles(@Parent() user: UserOutput): Promise<RoleType[]> {
    return (this._userService as any)._find_roles(user.id);
  }
}
