import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const AuthToken = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Express.AuthToken | null => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.authToken ?? null;
  },
);
