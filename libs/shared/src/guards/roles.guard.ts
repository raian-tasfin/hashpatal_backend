import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesGuard[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) return true;
    const request = this.getRequest(context);
    const user = request?.user;
    if (!user || !user.roles) return false;
    return requiredRoles.some((role) => user.roles.includes(role));
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
