import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  mixin,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRoles } from './user-roles';

const guards: Record<UserRoles, (user: Express.User) => boolean> = {
  [UserRoles.ADMIN]: (user: Express.User) => {
    return user.role === UserRoles.ADMIN;
  },
  [UserRoles.CUSTOMER_HEAD_ADMIN]: (user: Express.User) => {
    return user.role === UserRoles.CUSTOMER_HEAD_ADMIN;
  },
  [UserRoles.CUSTOMER_ADMIN]: (user: Express.User) => {
    return user.role === UserRoles.CUSTOMER_ADMIN;
  },
  [UserRoles.DEPARTMENT_HEAD]: (user: Express.User) => {
    return user.role === UserRoles.DEPARTMENT_HEAD;
  },
  [UserRoles.DEPARTMENT_HEAD_CORP]: (user: Express.User) => {
    return user.role === UserRoles.DEPARTMENT_HEAD_CORP;
  },
  [UserRoles.MOBILE_USER]: (user: Express.User) => {
    return user.role === UserRoles.MOBILE_USER;
  },
  [UserRoles.SELLER]: (user: Express.User) => {
    return user.role === UserRoles.SELLER;
  },
  [UserRoles.MANAGEMENT]: (user: Express.User) => {
    return user.role === UserRoles.MANAGEMENT;
  },
  [UserRoles.DEALER]: (user: Express.User) => {
    return user.role === UserRoles.DEALER;
  },
  [UserRoles.REPORT_USER]: (user: Express.User) => {
    return user.role === UserRoles.REPORT_USER;
  },
  [UserRoles.IT_USER]: (user: Express.User) => {
    return user.role === UserRoles.IT_USER;
  },
  [UserRoles.FINANCING_AGENT]: (user: Express.User) => {
    return user.role === UserRoles.FINANCING_AGENT;
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

        return guard(user);
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
