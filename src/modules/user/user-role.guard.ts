import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  mixin,
} from '@nestjs/common';
import { Request } from 'express';

const guards: Record<
  'ADMIN_USER' | 'MANAGER_USER' | 'REGULAR_USER',
  (user: Express.User) => boolean
> = {
  ADMIN_USER: (user: Express.User) => {
    return user.role === 'admin';
  },
  MANAGER_USER: (user: Express.User) => {
    return user.role === 'manager';
  },
  REGULAR_USER: (user: Express.User) => {
    return user.role === 'user';
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
