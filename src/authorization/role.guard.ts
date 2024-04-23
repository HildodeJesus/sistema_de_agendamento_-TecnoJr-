import {
  CanActivate,
  ExecutionContext,
  Type,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const RoleGuard = (role: string[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    matchRoles(roles: string[], userRole: string) {
      return roles.some((role) => role === userRole);
    }

    canActivate(context: ExecutionContext) {
      if (!role) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const hasRole = this.matchRoles(role, user.role);

      if (!hasRole) throw new UnauthorizedException();

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
