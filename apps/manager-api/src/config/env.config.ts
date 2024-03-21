import { getOauthServerUrl } from '@skytech/manager/utils/constants';

export const config = () => ({
  environment: process.env.ENVIRONMENT || 'development',
  port: parseInt(process.env.PORT, 10) || 4000,
  auth: {
    managerAuthToken: process.env.MANAGER_AUTH_TOKEN,
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
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
  },
  telia: {
    api_key: process.env.TELIA_API_KEY,
  },
});
