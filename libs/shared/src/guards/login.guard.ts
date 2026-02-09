import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { LOGIN_KEY } from './login.decorator';

@Injectable()
export class LoginGuard extends AuthGuard('jwt') {
  constructor(protected readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiresLogin = this.reflector.getAllAndOverride<boolean>(LOGIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiresLogin) return true;
    return (await super.canActivate(context)) as boolean;
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
