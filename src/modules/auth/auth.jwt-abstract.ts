import { Logger } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';

import { generatePublicKey } from './utils';

export abstract class Jwt<PayloadType extends object> {
  protected abstract readonly JWT_SECRET: string;

  protected abstract readonly logger: Logger;

  verifyJwt(token: string): PayloadType | null {
    try {
      const payload = jsonwebtoken.verify(
        token,
        generatePublicKey(this.JWT_SECRET),
        {
          ignoreExpiration: false,
          algorithms: ['RS256'],
        },
      );

      if (typeof payload !== 'object') {
        this.logger.debug('JWT invalid because payload is not an object');
        return null;
      }

      return payload as PayloadType;
    } catch {
      // Something went wrong.
    }

    this.logger.debug('JWT invalid because of some unknown error');
    return null;
  }
}
