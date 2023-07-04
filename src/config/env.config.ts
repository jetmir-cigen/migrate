import { getOauthServerUrl } from '@/utils/constants';

export const config = () => ({
  environment: process.env.ENVIRONMENT,
  port: parseInt(process.env.PORT, 10) || 4000,
  auth: {
    authTokenCookie: process.env.AUTH_TOKEN_COOKIE,
    oauthServerUrl: getOauthServerUrl(process.env.ENVIRONMENT),
    publicKeyUrl: `${getOauthServerUrl(process.env.ENVIRONMENT)}/pubkey`,
  },
  database: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: process.env.DB_SSL,
  },
});
