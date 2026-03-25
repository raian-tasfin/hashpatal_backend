import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { AddDepartmentInput } from './input';
import { DepartmentOutput } from './output';

@Resolver(() => DepartmentOutput)
export class DepartmentResolver {
  constructor(
    @Inject(DepartmentService)
    private readonly _departmentService: DepartmentService,
  ) {}

  /**
   * Mutations
   */
  @Mutation(() => Boolean)
  async department_add(@Args('data') data: AddDepartmentInput) {
    return await this._departmentService.add(data);
  }

  /**
   * Queries
   */
  @Query(() => [DepartmentOutput], { nullable: true })
  async department_fetch_all() {
    const records = await this._departmentService.fetch_all();
    return records.map(DepartmentOutput.from_model);
  }
}
