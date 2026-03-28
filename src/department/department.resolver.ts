import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { AddDepartmentInput, FindDepartmentInput } from './input';
import { DepartmentOutput } from './output';
import { UserOutput } from 'src/user/output';

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

  @Query(() => DepartmentOutput, { nullable: true })
  async department_find(@Args('data') data: FindDepartmentInput) {
    const record = await this._departmentService.find(data);
    if (!record) return null;
    return DepartmentOutput.from_model(record);
  }

  @ResolveField(() => [UserOutput], { nullable: true })
  async doctors(@Parent() department: DepartmentOutput): Promise<UserOutput[]> {
    const users = await this._departmentService.find_doctors(department.id);
    return users.map(UserOutput.from_model);
  }
}
