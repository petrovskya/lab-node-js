import {
  Environment,
  EnvironmentFlag,
  UNKNOWN_ENVIRONMENT,
} from 'config/constants';

export const addEnvironmentFlag = (appEnvironment: string, title: string) => {
  switch (appEnvironment) {
    case Environment.DEVELOPMENT:
      return title + EnvironmentFlag.DEVELOPMENT;

    case Environment.TEST:
      return title + EnvironmentFlag.TEST;

    case Environment.PRODUCTION:
      return title + EnvironmentFlag.PRODUCTION;

    default:
      return new Error(UNKNOWN_ENVIRONMENT);
  }
};
