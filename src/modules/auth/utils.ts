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
export function formatPublicKey(pubKeyStr: string): string {
  const publickKey = `-----BEGIN PUBLIC KEY-----\n${pubKeyStr}\n-----END PUBLIC KEY-----`;
  return publickKey;
}
