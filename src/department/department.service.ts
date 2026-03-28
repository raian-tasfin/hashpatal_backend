import { Inject, Injectable, Logger } from '@nestjs/common';
import { KyselyDatabaseService, Department, User } from '@org/shared/db';
import { AddDepartmentInput, FindDepartmentInput } from './input';

@Injectable()
export class DepartmentService {
  private readonly logger = new Logger(DepartmentService.name);

  constructor(
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
  ) {}

  /**
   * Mutations
   */
  async add({ name }: AddDepartmentInput): Promise<boolean> {
    this.logger.log(`Adding department '${name}'`);
    await this._db
      .insertInto('department')
      .values({ name })
      .onConflict((x) => x.doNothing())
      .execute();
    return true;
  }

  /**
   * Queries
   */
  async fetch_all(): Promise<Department[]> {
    this.logger.log(`Fetching all departments.`);
    return await this._db.selectFrom('department').selectAll().execute();
  }

  async find({ uuid }: FindDepartmentInput): Promise<Department | undefined> {
    this.logger.log(`Finding department '${uuid}'`);
    return await this._db
      .selectFrom('department')
      .selectAll()
      .where('department.uuid', '=', uuid)
      .executeTakeFirst();
  }

  async find_doctors(departmentId: number): Promise<User[]> {
    return await this._db
      .selectFrom('user_account')
      .innerJoin('doctor_profile', 'doctor_profile.user_id', 'user_account.id')
      .where('doctor_profile.department_id', '=', departmentId)
      .selectAll('user_account')
      .execute();
  }

  async find_by_name({
    name,
  }: {
    name: string;
  }): Promise<Department | undefined> {
    return await this._db
      .selectFrom('department')
      .selectAll()
      .where('name', '=', name)
      .executeTakeFirst();
  }
}
