import { Inject, Injectable, Logger } from '@nestjs/common';
import { KyselyDatabaseService, Department } from '@org/shared/db';
import { AddDepartmentInput } from './input';

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

  async find(data: { uuid: string }): Promise<Department | undefined> {
    const { uuid } = data;
    this.logger.log(`Finding department '${uuid}'`);
    return await this._db
      .selectFrom('department')
      .selectAll()
      .where('department.uuid', '=', uuid)
      .executeTakeFirst();
  }

  /**
   * TODO:
   * Merge
   * Deactiveate
   */
}
