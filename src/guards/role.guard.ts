import {
  CanActivate,
  ExecutionContext,
  Type,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';

export const RoleGuard = (roles: string[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    matchRoles(roles: string[], userRole: string) {
      return roles.some((role) => role === userRole);
    }

    canActivate(context: ExecutionContext) {
      if (roles.length == 0) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      const hasRole = this.matchRoles(roles, user.role);
      console.log(roles);

      if (!hasRole) throw new UnauthorizedException();

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
