import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

import { IUser } from '@skytech/auth';

interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
}

// This decorator assumes that all steps for making sure that user has
// access are already met.
export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest<IGetUserAuthInfoRequest>();

    if (typeof request.user !== 'object') {
      throw new InternalServerErrorException('Missing user data');
    }

    return request.user;
  },
);
