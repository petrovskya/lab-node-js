export const HASH_SALT = 3;
export const PORT = 3000;
export const CONNECTION_READY_STATE = 1;
export const COOKIE_MAX_AGE_IN_DAYS = 7;
export const ACCESS_TOKEN_EXPIRATION = '15m';
export const REFRESH_TOKEN_EXPIRATION = '7d';
export const REQUEST_SUBJECT_KEY = 'sub';
export const REQUEST_REFRESH_TOKEN_KEY = 'refreshToken';
export const COOKIE_NAME = 'refreshToken';
export const AUTHORIZATION_HEADER = 'Authorization';
export const BEARER_TOKEN_START_VALUE = 'Bearer';
export const ENVIRONMENT_PATH = './.env';

export const STRATEGY = {
  REFRESH: 'refreshJwt',
  ACCESS: 'accessJwt',
};

export enum Environment {
  DEVELOPMENT = 'DEV',
  PRODUCTION = 'PROD',
  TEST = 'TEST',
}

export const EnvironmentFlag = {
  DEVELOPMENT: ' | Dev',
  PRODUCTION: ' | Prod',
  TEST: ' | Test',
};

export const UNKNOWN_ENVIRONMENT = 'unknown';

export const APP_ENVIRONMENT = 'ENVIRONMENT';

export const DATABASE_ENVIRONMENT = 'DATABASE_URL';
