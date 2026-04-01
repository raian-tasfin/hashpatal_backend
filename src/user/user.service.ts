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
import {
  AppointmentStatusType,
  KyselyDatabaseService,
  RoleType,
  User,
} from '@org/shared/db';
import { DB } from '@org/shared/db/types';
import { PasswordService } from '@org/shared/password';
import { addDays } from 'date-fns';
import { Kysely, SelectQueryBuilder } from 'kysely';
import { v4 as uuidv4 } from 'uuid';
import {
  FindUserInput,
  LoginInput,
  LogoutInput,
  RefreshLoginInput,
  RegisterInput,
  SyncRolesInput,
} from './input';
import { MeOutput, TokenPair, UserOutput } from './output';
import { AppointmentOutput } from 'src/schedule/output';

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

  async register(data: RegisterInput): Promise<boolean> {
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
        return true;
      });
    } catch (err: any) {
      this._logger.warn(`${err.message}`);
      if (err.code === '23505') {
        throw new ConflictException('A user with this email already exists.');
      }
      throw new InternalServerErrorException('User creation failed');
    }
  }

  async find(key: FindUserInput): Promise<User | undefined> {
    this._logger.log(`Finding user.`);
    const email = key.email ?? null;
    const uuid = key.uuid ?? null;
    return this._find_user_by_keys({ email, uuid }).executeTakeFirst();
  }

  async me(uuid: string): Promise<MeOutput | null> {
    const user = await this.find({ uuid });
    if (!user) return null;

    const [upcoming, past, roles] = await Promise.all([
      this._get_appointments(user.id, AppointmentStatusType.SCHEDULED),
      this._get_appointments(user.id, AppointmentStatusType.COMPLETED),
      this._find_roles(user.id),
    ]);

    const userOutput = UserOutput.from_model(user);
    userOutput.user_roles = roles;

    return {
      user: userOutput,
      upcoming_appointments: upcoming.length,
      past_visits: past.length,
      upcoming_appointment_list: upcoming.map(AppointmentOutput.from_model),
    };
  }

  private async _get_appointments(
    userId: number,
    status: AppointmentStatusType,
  ) {
    return await this._db
      .selectFrom('appointment')
      .selectAll()
      .where('patient_id', '=', userId)
      .where('status', '=', status)
      .orderBy('date', 'asc')
      .execute();
  }

  async login({ email, password }: LoginInput) {
    this._logger.log(`Logging in user ${email}`);
    this._logger.log(`Finding user ${email}`);
    const user = await this.find({ email });
    if (!user) {
      throw new NotFoundException(`User ${email} not found.`);
    }
    if (!(await this._passwordService.match(password, user.password_hash))) {
      this._logger.warn(`Invalid password for email ${email}`);
      throw new UnauthorizedException('Invalid password');
    }
    this._logger.log(`Getting user roles for ${email}`);
    const roles = await this._find_roles(user.id);
    this._logger.log(`Issuing new token for ${email}`);
    return await this._issue_token(user, roles);
  }

  async refresh({ refreshToken }: RefreshLoginInput): Promise<TokenPair> {
    this._logger.log(`Processing refresh request.`);
    const { sub, jit } = await this._decrypt_refresh_token(refreshToken);
    const user = await this._db
      .selectFrom('user_account')
      .selectAll()
      .where('uuid', '=', sub)
      .executeTakeFirst();
    if (!user) throw new UnauthorizedException('User not found');
    const roles = await this._find_roles(user.id);
    return await this._db.transaction().execute(async (trx) => {
      const deleted = await trx
        .deleteFrom('refresh_token')
        .where('jit', '=', jit)
        .returning('id')
        .executeTakeFirst();
      if (!deleted) {
        this._logger.warn(`Refresh token reuse detected for JIT: ${jit}`);
        throw new UnauthorizedException('Invalid refresh token');
      }
      return this._issue_token(user, roles, trx);
    });
  }

  async logout({ refreshToken }: LogoutInput): Promise<void> {
    const { jit } = await this._decrypt_refresh_token(refreshToken);
    await this._db.deleteFrom('refresh_token').where('jit', '=', jit).execute();
  }

  async sync_roles({ uuid, roles }: SyncRolesInput): Promise<void> {
    this._logger.log(`Syncing roles for user ${uuid}: ${roles.join(', ')}`);
    const user = await this.find({ uuid });
    if (!user) {
      throw new NotFoundException(`User with UUID ${uuid} not found.`);
    }
    await this._db.transaction().execute(async (trx) => {
      await trx
        .deleteFrom('user_role')
        .where('user_id', '=', user.id)
        .execute();
      if (roles.length > 0) {
        const roleRecords = roles.map((role) => ({
          user_id: user.id,
          role: role,
        }));
        await trx.insertInto('user_role').values(roleRecords).execute();
      }
    });
    this._logger.log(`Successfully synced roles for ${uuid}`);
  }
  /**
   * Utilities
   */
  async _find_roles(userId: number): Promise<RoleType[]> {
    const roles = await this._db
      .selectFrom('user_role')
      .select('role')
      .where('user_id', '=', userId)
      .execute();
    return roles.map((r) => r.role as RoleType);
  }

  private async _issue_token(
    user: User,
    roles: RoleType[],
    db: Kysely<DB> = this._db,
  ): Promise<TokenPair> {
    this._logger.log(`Issuing token for ${user.email}`);
    this._logger.log(`Creating jit.`);
    const jit = uuidv4();
    this._logger.log(`JIT created.`);

    const sub = user.uuid;
    const payload = { sub, jit, roles };

    // sign tokens
    this._logger.log(`Signing tokens for (${sub}, ${roles})`);
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(payload, {
        expiresIn: this._ACCESS_TOKEN_TIME,
      }),
      this._jwtService.signAsync(payload, {
        expiresIn: this._REFERSH_TOKEN_TIME,
      }),
    ]);
    this._logger.log(`Both tokens signed`);

    // values for RefreshToken table in schema
    const user_id = user.id;
    const expires_at = addDays(new Date(), 7);
    const token_hash = await this._passwordService.hash(refreshToken);
    this._logger.log(`Updating refresh token table`);
    await db
      .insertInto('refresh_token')
      .values({ jit, expires_at, token_hash, user_id })
      .returningAll()
      .execute();
    this._logger.log(`Updated refresh token table`);
    this._logger.log(`Returning token pair`);
    return { accessToken, refreshToken };
  }

  private async _decrypt_refresh_token(refreshToken: string) {
    this._logger.log(`Finding refresh token record for ${refreshToken}`);
    // decrypt token
    this._logger.log(`Decrypting token`);
    const payload = await this._jwtService
      .verifyAsync(refreshToken)
      .catch(() => {
        throw new UnauthorizedException('Invalid refresh token');
      });
    return payload;
  }

  private _find_user_by_keys(
    keys: Record<string, any>,
  ): SelectQueryBuilder<DB, 'user_account', User> {
    let query = this._db.selectFrom('user_account').selectAll();
    for (const [column, value] of Object.entries(keys)) {
      if (value !== undefined && value !== null) {
        query = query.where(column as any, '=', value);
      }
    }
    return query;
  }

  async _get_user_by_id(id: number) {
    return await this._db
      .selectFrom('user_account')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
  }
}
