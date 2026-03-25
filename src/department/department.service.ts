import { Inject, Injectable, Logger } from '@nestjs/common';
import { KyselyDatabaseService, Department } from '@org/shared/db';
import { AddDepartmentInput } from './input';

@Injectable()
export class DepartmentService {
  private readonly logger = new Logger(DepartmentService.name);

  constructor(
    @Inject(KyselyDatabaseService) private readonly _db: KyselyDatabaseService,
  ) {}

  async add({ name }: AddDepartmentInput): Promise<boolean> {
    await this._db
      .insertInto('department')
      .values({ name })
      .onConflict((x) => x.doNothing())
      .execute();
    return true;
  }

  async fetch_all(): Promise<Department[]> {
    return await this._db.selectFrom('department').selectAll().execute();
  }

  /**
   * TODO:
   * Merge
   * Deactiveate
   */
}
