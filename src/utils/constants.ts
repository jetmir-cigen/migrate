export const getOauthServerUrl = (env = 'development') => {
  // This var needs to be specific to the current environment.
  // For prod it should be https://auth.skytechcontrol.io
  // For test: https://auth-test.skytechcontrol.io
  // For sandbox: https://auth-sandbox.skytechcontrol.io
  // For dev: https://auth-dev.skytechcontrol.io

  // This var is set in the .env file
  if (env.toLowerCase() === 'production') {
    return 'https://auth.skytechcontrol.io';
  }
  if (env.toLowerCase() === 'test') {
    return 'https://auth-test.skytechcontrol.io';
  }
  if (env.toLowerCase() === 'sandbox') {
    return 'https://auth-sandbox.skytechcontrol.io';
  }
  if (env.toLowerCase() === 'development') {
    return 'https://auth-dev.skytechcontrol.io';
  }
};

type ApplicationType = 'manager' | 'stats' | 'form' | 'dealer' | 'app';
export const getAppLink = (app: ApplicationType, path?: string) => {
  const baseUrl = `https://${app}`;

  // This var is set in the .env file
  const env = process.env.ENVIRONMENT;
  if (env.toLowerCase() === 'production') {
    return `${baseUrl}.skytechcontrol.io/${path}`;
  }
  if (env.toLowerCase() === 'test') {
    return `${baseUrl}-test.skytechcontrol.io/${path}`;
  }
  if (env.toLowerCase() === 'sandbox') {
    return `${baseUrl}-sandbox.skytechcontrol.io/${path}`;
  }
  if (env.toLowerCase() === 'development') {
    return `${baseUrl}-dev.skytechcontrol.io/${path}`;
  }
};
