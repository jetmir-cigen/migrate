import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

interface IGetUserAuthInfoRequest extends Request {
  user: Express.User;
}

// This decorator assumes that all steps for making sure that user has
// access are already met.
export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Express.User => {
    const request = ctx.switchToHttp().getRequest<IGetUserAuthInfoRequest>();

    if (typeof request.user !== 'object') {
      throw new InternalServerErrorException('Missing user data');
    }

    return request.user;
  },
);
