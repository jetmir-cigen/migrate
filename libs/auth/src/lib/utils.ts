import * as crypto from 'crypto';

/**
 * Extract JWT token from 'Authorization' header.
 */
export function jwtFromBearer(authHeader: string | undefined): string | null {
  const token = authHeader?.slice('Bearer '.length);

  if (!token) {
    return null;
  }

  return token as string;
}

/**
 * Format public key(string) to be used in JWT.
 */
export function generatePublicKey(pubKeyStr: string) {
  const publickKey = `-----BEGIN PUBLIC KEY-----\n${pubKeyStr}\n-----END PUBLIC KEY-----`;
  return crypto.createPublicKey({
    key: publickKey,
    format: 'pem',
  });
}

/**
 * Format public key(string) to be used in JWT.
 */
export function formatPublicKey(pubKeyStr: string) {
  return `-----BEGIN PUBLIC KEY-----\n${pubKeyStr}\n-----END PUBLIC KEY-----`;
}
