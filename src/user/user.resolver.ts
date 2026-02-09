import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  FindByEmailInput,
  LoginInput,
  LogoutInput,
  RefreshLoginInput,
  RegisterInput,
} from './input';
import { TokenPair, UserOutput } from './output';
import { UserService } from './user.service';
import { Role } from '@org/shared/db';
import { Login } from '@org/shared/guards';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
  ) {}

  /**
   * Mutations
   */
  @Mutation(() => UserOutput)
  async register_user(@Args('data') data: RegisterInput): Promise<UserOutput> {
    const user = await this._userService.register(data);
    return UserOutput.from_model(user);
  }

  @Mutation(() => TokenPair)
  async login(@Args('data') data: LoginInput): Promise<TokenPair> {
    return this._userService.login(data);
  }

  @Mutation(() => TokenPair)
  async refresh_token(
    @Args('data') data: RefreshLoginInput,
  ): Promise<TokenPair> {
    return this._userService.refresh(data);
  }

  @Mutation(() => Boolean)
  async logout(@Args('data') data: LogoutInput): Promise<boolean> {
    await this._userService.logout(data);
    return true;
  }

  /**
   * Queries
   */
  //   @Login()
  @Query(() => UserOutput)
  async find_user(
    @Args('data') data: FindByEmailInput,
  ): Promise<UserOutput | undefined> {
    const user = await this._userService.find_by_email(data);
    return user ? UserOutput.from_model(user) : undefined;
  }

  /**
   * Field Resolvers
   */
  @ResolveField(() => [Role])
  async roles(@Parent() user: UserOutput): Promise<Role[]> {
    return (this._userService as any)._find_roles(user.id);
  }
}
