import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { KyselyDatabaseService, RoleType, User } from '@org/shared/db';
import { DB } from '@org/shared/db/types';
import { PasswordService } from '@org/shared/password';
import { addDays } from 'date-fns';
import { Kysely } from 'kysely';
import { v4 as uuidv4 } from 'uuid';
import {
  FindByEmailInput,
  FindByUuidInput,
  LoginInput,
  LogoutInput,
  RefreshLoginInput,
  RegisterInput,
  SyncRolesInput,
} from './input';
import { TokenPair } from './output';

@Injectable()
export class UserService {
  private readonly _logger = new Logger(UserService.name);
  private readonly _ACCESS_TOKEN_TIME = '15m';
  private readonly _REFERSH_TOKEN_TIME = '7d';

  constructor(
    @Inject(PasswordService) private readonly _passwordService: PasswordService,
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
    @Inject(JwtService) private readonly _jwtService: JwtService,
  ) {}

  async register(data: RegisterInput): Promise<User> {
    const { email, password, name, birthDate } = data;
    this._logger.log(`Registering user with email ${email}, name: ${name}`);
    const password_hash = await this._passwordService.hash(password);
    const birth_date = new Date(birthDate);
    try {
      return await this._db.transaction().execute(async (trx) => {
        const newUser = await trx
          .insertInto('user_account')
          .values({
            email,
            name,
            password_hash,
            birth_date,
          })
          .returningAll()
          .executeTakeFirstOrThrow();
        await trx
          .insertInto('user_role')
          .values({ user_id: newUser.id, role: RoleType.PATIENT })
          .executeTakeFirstOrThrow();
        return newUser;
      });
    } catch (err: any) {
      this._logger.warn(`${err.message}`);
      if (err.code === '23505') {
        throw new ConflictException('A user with this email already exists.');
      }
      throw new InternalServerErrorException('User creation failed');
    }
  }

  // async find_by_email({ email }: FindByEmailInput): Promise<User | undefined> {
  //   this._logger.log(`Finding user by email ${email}`);
  //   const user = await this._db
  //     .selectFrom('user')
  //     .selectAll()
  //     .where('email', '=', email)
  //     .executeTakeFirst();
  //   return user;
  // }
  //
  // async find_by_uuid({ uuid }: FindByUuidInput): Promise<User | undefined> {
  //   this._logger.log(`Finding user by uuid ${uuid}`);
  //   const user = await this._db
  //     .selectFrom('user')
  //     .selectAll()
  //     .where('uuid', '=', uuid)
  //     .executeTakeFirst();
  //   return user;
  // }
  //
  // async login({ email, password }: LoginInput) {
  //   this._logger.log(`Logging in user ${email}`);
  //   this._logger.log(`Finding user ${email}`);
  //   const user = await this.find_by_email({ email });
  //   if (!user) {
  //     throw new NotFoundException(`User ${email} not found.`);
  //   }
  //   if (!(await this._passwordService.match(password, user.passwordHash))) {
  //     this._logger.warn(`Invalid password for email ${email}`);
  //     throw new UnauthorizedException('Invalid password');
  //   }
  //   this._logger.log(`Getting user roles for ${email}`);
  //   const roles = await this._find_roles(user.id);
  //   this._logger.log(`Issuing new token for ${email}`);
  //   return await this._issue_token(user, roles);
  // }
  //
  // async refresh({ refreshToken }: RefreshLoginInput): Promise<TokenPair> {
  //   this._logger.log(`Processing refresh request.`);
  //   const { sub, jit } = await this._decrypt_refresh_token(refreshToken);
  //   const user = await this._db
  //     .selectFrom('user')
  //     .selectAll()
  //     .where('uuid', '=', sub)
  //     .executeTakeFirst();
  //   if (!user) throw new UnauthorizedException('User not found');
  //   const roles = await this._find_roles(user.id);
  //   return await this._db.transaction().execute(async (trx) => {
  //     const deleted = await trx
  //       .deleteFrom('refresh_token')
  //       .where('jit', '=', jit)
  //       .returning('id')
  //       .executeTakeFirst();
  //     if (!deleted) {
  //       this._logger.warn(`Refresh token reuse detected for JIT: ${jit}`);
  //       throw new UnauthorizedException('Invalid refresh token');
  //     }
  //     return this._issue_token(user, roles, trx);
  //   });
  // }
  //
  // async logout({ refreshToken }: LogoutInput): Promise<void> {
  //   const { jit } = await this._decrypt_refresh_token(refreshToken);
  //   await this._db.deleteFrom('refresh_token').where('jit', '=', jit).execute();
  // }
  //
  // async sync_roles({ email, roles }: SyncRolesInput): Promise<void> {
  //   this._logger.log(`Syncing roles for user ${email}: ${roles.join(', ')}`);
  //   const user = await this.find_by_email({ email });
  //   if (!user) {
  //     throw new NotFoundException(`User with email ${email} not found.`);
  //   }
  //   await this._db.transaction().execute(async (trx) => {
  //     await trx.deleteFrom('user_role').where('userId', '=', user.id).execute();
  //     if (roles.length > 0) {
  //       const roleRecords = roles.map((role) => ({
  //         userId: user.id,
  //         role: role,
  //       }));
  //       await trx.insertInto('user_role').values(roleRecords).execute();
  //     }
  //   });
  //   this._logger.log(`Successfully synced roles for ${email}`);
  // }
  // /**
  //  * Utilities
  //  */
  // async _find_roles(userId: number): Promise<RoleType[]> {
  //   const roles = await this._db
  //     .selectFrom('user_role')
  //     .select('role')
  //     .where('userId', '=', userId)
  //     .execute();
  //   return roles.map((r) => r.role as RoleType);
  // }
  //
  // private async _issue_token(
  //   user: User,
  //   roles: RoleType[],
  //   db: Kysely<DB> = this._db,
  // ): Promise<TokenPair> {
  //   this._logger.log(`Issuing token for ${user.email}`);
  //   this._logger.log(`Creating jit.`);
  //   const jit = uuidv4();
  //   this._logger.log(`JIT created.`);
  //
  //   const sub = user.uuid;
  //   const payload = { sub, jit, roles };
  //
  //   // sign tokens
  //   this._logger.log(`Signing tokens for (${sub}, ${roles})`);
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this._jwtService.signAsync(payload, {
  //       expiresIn: this._ACCESS_TOKEN_TIME,
  //     }),
  //     this._jwtService.signAsync(payload, {
  //       expiresIn: this._REFERSH_TOKEN_TIME,
  //     }),
  //   ]);
  //   this._logger.log(`Both tokens signed`);
  //
  //   // values for RefreshToken table in schema
  //   const userId = user.id;
  //   const expiresAt = addDays(new Date(), 7);
  //   const tokenHash = await this._passwordService.hash(refreshToken);
  //   this._logger.log(`Updating refresh token table`);
  //   await db
  //     .insertInto('refresh_token')
  //     .values({ jit, expiresAt, tokenHash, userId })
  //     .returningAll()
  //     .execute();
  //   this._logger.log(`Updated refresh token table`);
  //   this._logger.log(`Returning token pair`);
  //   return { accessToken, refreshToken };
  // }
  //
  // private async _decrypt_refresh_token(refreshToken: string) {
  //   this._logger.log(`Finding refresh token record for ${refreshToken}`);
  //   // decrypt token
  //   this._logger.log(`Decrypting token`);
  //   const payload = await this._jwtService
  //     .verifyAsync(refreshToken)
  //     .catch(() => {
  //       throw new UnauthorizedException('Invalid refresh token');
  //     });
  //   return payload;
  // }
}
