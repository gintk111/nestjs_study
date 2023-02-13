import Role from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';

const RoleGuard = (roles: Role[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return roles.includes(user?.role);
    }
  }
  return mixin(RoleGuardMixin);
};

export default RoleGuard;
