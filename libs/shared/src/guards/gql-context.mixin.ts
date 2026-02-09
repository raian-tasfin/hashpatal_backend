import { ExecutionContext, Type } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export function UseGqlContext<T extends Type<any>>(BaseGuard: T) {
  abstract class GqlAdaptedGuard extends (BaseGuard as any) {
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
  }
  return GqlAdaptedGuard as T;
}
