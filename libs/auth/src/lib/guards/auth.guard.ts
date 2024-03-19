import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  mixin,
} from '@nestjs/common';
import { IRequestWithUser, UserRole, UserRoles } from '../auth.types';

const guards: Record<UserRole, (role: UserRole) => boolean> = {
  [UserRoles.ADMIN]: (role: UserRole) => {
    return role === UserRoles.ADMIN;
  },
  [UserRoles.CUSTOMER_HEAD_ADMIN]: (role: UserRole) => {
    return role === UserRoles.CUSTOMER_HEAD_ADMIN;
  },
  [UserRoles.CUSTOMER_ADMIN]: (role: UserRole) => {
    return role === UserRoles.CUSTOMER_ADMIN;
  },
  [UserRoles.DEPARTMENT_HEAD]: (role: UserRole) => {
    return role === UserRoles.DEPARTMENT_HEAD;
  },
  [UserRoles.DEPARTMENT_HEAD_CORP]: (role: UserRole) => {
    return role === UserRoles.DEPARTMENT_HEAD_CORP;
  },
  [UserRoles.MOBILE_USER]: (role: UserRole) => {
    return role === UserRoles.MOBILE_USER;
  },
  [UserRoles.SELLER]: (role: UserRole) => {
    return role === UserRoles.SELLER;
  },
  [UserRoles.MANAGEMENT]: (role: UserRole) => {
    return role === UserRoles.MANAGEMENT;
  },
  [UserRoles.DEALER]: (role: UserRole) => {
    return role === UserRoles.DEALER;
  },
  [UserRoles.REPORT_USER]: (role: UserRole) => {
    return role === UserRoles.REPORT_USER;
  },
  [UserRoles.IT_USER]: (role: UserRole) => {
    return role === UserRoles.IT_USER;
  },
  [UserRoles.FINANCING_AGENT]: (role: UserRole) => {
    return role === UserRoles.FINANCING_AGENT;
  },
};

export function AuthGuard(guardsIds: Array<keyof typeof guards> = []) {
  class AuthGuardClass implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<IRequestWithUser>();
      const { user } = request;

      if (!user) {
        throw new UnauthorizedException('Missing user data');
      }

      if (guardsIds.length === 0) {
        return true;
      }

      const canAccess = guardsIds.some((guardId) => {
        const guard = guards[guardId];

        return guard(user.role);
      });

      if (canAccess) {
        return true;
      }

      // User is not allowed to access the endpoint due to disallowed
      // user type.
      throw new ForbiddenException('FORBIDDEN_USER_TYPE');
    }
  }

  return mixin(AuthGuardClass);
}
