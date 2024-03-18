import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  mixin,
} from '@nestjs/common';
import { Request } from 'express';

import { UserRolesENUM } from './user-roles.enum';

const guards: Record<UserRolesENUM, (role: UserRolesENUM) => boolean> = {
  [UserRolesENUM.ADMIN]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.ADMIN;
  },
  [UserRolesENUM.CUSTOMER_HEAD_ADMIN]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.CUSTOMER_HEAD_ADMIN;
  },
  [UserRolesENUM.CUSTOMER_ADMIN]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.CUSTOMER_ADMIN;
  },
  [UserRolesENUM.DEPARTMENT_HEAD]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.DEPARTMENT_HEAD;
  },
  [UserRolesENUM.DEPARTMENT_HEAD_CORP]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.DEPARTMENT_HEAD_CORP;
  },
  [UserRolesENUM.MOBILE_USER]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.MOBILE_USER;
  },
  [UserRolesENUM.SELLER]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.SELLER;
  },
  [UserRolesENUM.MANAGEMENT]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.MANAGEMENT;
  },
  [UserRolesENUM.DEALER]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.DEALER;
  },
  [UserRolesENUM.REPORT_USER]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.REPORT_USER;
  },
  [UserRolesENUM.IT_USER]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.IT_USER;
  },
  [UserRolesENUM.FINANCING_AGENT]: (role: UserRolesENUM) => {
    return role === UserRolesENUM.FINANCING_AGENT;
  },
};

export function UserRoleGuard(guardsIds: Array<keyof typeof guards>) {
  class UserRoleGuardClass implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const { user } = request;

      if (!user) {
        throw new InternalServerErrorException('Missing user data');
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

  return mixin(UserRoleGuardClass);
}
