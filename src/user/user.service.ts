import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PasswordService } from '@org/shared/password';
import { FindByEmailInput, RegisterUserInput, FindByUuidInput } from './input';
import { KyselyDatabaseService, User } from '@org/shared/db';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly ACCESS_TOKEN_TIME = '15m';
  private readonly REFERSH_TOKEN_TIME = '7d';

  constructor(
    @Inject(PasswordService) private readonly passwordService: PasswordService,
    @Inject(KyselyDatabaseService) private readonly db: KyselyDatabaseService,
  ) {}

  async register(data: RegisterUserInput): Promise<User> {
    const { email, password, name, birthDate } = data;
    this.logger.log(`Registering user with email ${email}, name: ${name}`);
    const passwordHash = await this.passwordService.hash(password);
    try {
      const newUser = await this.db
        .insertInto('user')
        .values({ email, name, passwordHash, birthDate: new Date(birthDate) })
        .returningAll()
        .executeTakeFirstOrThrow();
      return newUser;
    } catch (err: any) {
      this.logger.error(`${err.message}`);
      if (err.code === '23505') {
        throw new ConflictException('A user with this email already exists.');
      }
      throw new InternalServerErrorException('User creation failed');
    }
  }

  async find_by_email({ email }: FindByEmailInput): Promise<User | undefined> {
    this.logger.log(`Finding user by email ${email}`);
    const user = await this.db
      .selectFrom('user')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
    return user;
  }

  async find_by_uuid({ uuid }: FindByUuidInput): Promise<User | undefined> {
    this.logger.log(`Finding user by uuid ${uuid}`);
    const user = await this.db
      .selectFrom('user')
      .selectAll()
      .where('uuid', '=', uuid)
      .executeTakeFirst();
    return user;
  }

  // async login({ email, password }: LoginUserInput): Promise<TokenEntity> {
  //   this.logger.log(`Logging in user ${email}`);
  //   this.logger.log(`Finding user ${email}`);
  //   const user = await this.find({ email });
  //   if (!(await this.passwordService.match(password, user.passwordHash))) {
  //     this.logger.error(`Invalid password for email ${email}`);
  //     throw new UnauthorizedException('Invalid password');
  //   }
  //   this.logger.log(`Getting user roles for ${email}`);
  //   const userWithRoles = await this.attach_user_roles(user);
  //   this.logger.log(`Issuing new token for ${email}`);
  //   return await this.issue_token(userWithRoles);
  // }
  //
  // async refresh({ refreshToken }: RefreshLoginInput): Promise<TokenEntity> {
  //   this.logger.log(`Refresh token ${refreshToken}`);
  //   const refreshTokenRecord =
  //     await this.get_refresh_token_record(refreshToken);
  //   this.logger.log(`Found refresh token record for ${refreshToken}`);
  //   return this.prismaService.$transaction(async (trx) => {
  //     this.logger.log(`Removing refresh token ${refreshToken}.`);
  //     await trx.refreshToken.delete({ where: { jit: refreshTokenRecord.jit } });
  //     this.logger.log(`Issuing new towken for ${refreshToken}.`);
  //     return this.issue_token(refreshTokenRecord.userAuth, trx);
  //   });
  // }
  //
  // async logout({ refreshToken }: LogoutInput) {
  //   const { jit } = await this.get_refresh_token_record(refreshToken);
  //   return this.prismaService.$transaction(async (tx) => {
  //     await tx.refreshToken.delete({ where: { jit } });
  //   });
  // }
  //
  // async attach_user_roles(user: UserModel): Promise<UserWithRoles> {
  //   return this.prismaService.user.findUniqueOrThrow({
  //     where: { id: user.id },
  //     include: {
  //       userRoles: {
  //         select: {
  //           role: true,
  //         },
  //       },
  //     },
  //   });
  // }
  // /**
  //  * Utilities
  //  */

  // private async issue_token(
  //   user: User,
  //   db: Kysely<DB> = this.db,
  // ): Promise<> {
  //   this.logger.log(`Issuing token for ${user.email}`);
  //   // create jit
  //   this.logger.log(`Creating jit.`);
  //   const jit = uuidv4();
  //   this.logger.log(`JIT created.`);
  //   // token payload
  //   const payload = {
  //     sub: user.uuid,
  //     jit: jit,
  //     roles: user.userRoles.map((r) => r.role),
  //   };
  //   // sign tokens
  //   this.logger.log(`Signing tokens for ${(payload.sub, payload.roles)}`);
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync(payload, { expiresIn: this.ACCESS_TOKEN_TIME }),
  //     this.jwtService.signAsync(payload, {
  //       expiresIn: this.REFERSH_TOKEN_TIME,
  //     }),
  //   ]);
  //   this.logger.log(`Both tokens signed`);
  //   // values for RefreshToken table in schema
  //   const userId = user.id;
  //   const expiresAt = addDays(new Date(), 7);
  //   const tokenHash = await this.passwordService.hash(refreshToken);
  //   this.logger.log(`Updating refresh token table`);
  //   await db.refreshToken.create({
  //     data: { jit, tokenHash, userId, expiresAt },
  //   });
  //   this.logger.log(`Updated refresh token table`);
  //   // return token pair
  //   this.logger.log(`Returning token pair`);
  //   return { accessToken, refreshToken };
  // }
  //
  // private async get_refresh_token_record(refreshToken: string) {
  //   this.logger.log(`Finding refresh token record for ${refreshToken}`);
  //   // decrypt token
  //   this.logger.log(`Decrypting token`);
  //   const payload = await this.jwtService
  //     .verifyAsync(refreshToken)
  //     .catch(() => {
  //       throw new UnauthorizedException('Invalid refresh token');
  //     });
  //   // get token
  //   this.logger.log(`Finding token record`);
  //   const refreshTokenRecord = await this.prismaService.refreshToken.findUnique(
  //     {
  //       where: { jit: payload.jit },
  //       include: { userAuth: { include: { userRoles: true } } },
  //     },
  //   );
  //   if (!refreshTokenRecord)
  //     this.logger.error(`No token found with given jit.`);
  //   if (
  //     !refreshTokenRecord ||
  //     !(await this.passwordService.match(
  //       refreshToken,
  //       refreshTokenRecord.tokenHash,
  //     ))
  //   ) {
  //     this.logger.error(`Invalid refresh token.`);
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  //   this.logger.log(`Returing refresh token record.`);
  //   return refreshTokenRecord;
  // }
}

/**
 * ArgumentTypes
 */
// type FindUserArgs =
//   | { email: string; uuid?: never }
//   | { email?: never; uuid: string };
