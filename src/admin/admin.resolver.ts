import { Inject, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Query, Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { AdminDashboardOutput } from './output';
import { GqlJwtAuthGuard } from '@org/shared/auth';
import { RoleType } from '@org/shared/db';
import { UserListItemOutput } from './output/user-list-item.output';
import { DoctorListItemOutput } from './output/doctor-list-item.output';

@Resolver()
export class AdminResolver {
  constructor(
    @Inject(AdminService)
    private readonly _adminService: AdminService,
  ) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => AdminDashboardOutput)
  async admin_dashboard(@Context() ctx: any): Promise<AdminDashboardOutput> {
    const roles: RoleType[] = ctx.req.user.roles;
    if (!roles?.includes(RoleType.ADMIN)) {
      throw new UnauthorizedException('Admins only.');
    }
    return AdminDashboardOutput.from_model(
      await this._adminService.admin_dashboard(),
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [UserListItemOutput])
  async admin_get_all_users(
    @Context() ctx: any,
  ): Promise<UserListItemOutput[]> {
    const roles: RoleType[] = ctx.req.user.roles;
    if (!roles?.includes(RoleType.ADMIN)) {
      throw new UnauthorizedException('Admins only.');
    }
    const users = await this._adminService.get_all_users();
    return users.map(UserListItemOutput.from_model);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [DoctorListItemOutput])
  async admin_get_all_doctors(
    @Context() ctx: any,
  ): Promise<DoctorListItemOutput[]> {
    const roles: RoleType[] = ctx.req.user.roles;
    if (!roles?.includes(RoleType.ADMIN))
      throw new UnauthorizedException('Admins only.');
    const doctors = await this._adminService.get_all_doctors();
    return doctors.map(DoctorListItemOutput.from_model);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Boolean)
  async admin_assign_doctor_department(
    @Context() ctx: any,
    @Args('doctorUuid') doctorUuid: string,
    @Args('departmentUuid', { nullable: true }) departmentUuid?: string,
  ): Promise<boolean> {
    const roles: RoleType[] = ctx.req.user.roles;
    if (!roles?.includes(RoleType.ADMIN))
      throw new UnauthorizedException('Admins only.');
    return this._adminService.assign_doctor_department(
      doctorUuid,
      departmentUuid ?? null,
    );
  }
}
