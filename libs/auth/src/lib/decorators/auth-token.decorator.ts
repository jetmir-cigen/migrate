import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IAuthToken, IRequestWithUser } from '@skytech/auth';

export const AuthToken = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): IAuthToken | null => {
    const request = ctx.switchToHttp().getRequest<IRequestWithUser>();
    return request.authToken ?? null;
  },
);
