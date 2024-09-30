import Config from 'react-native-config';

export const APP_ENV = Config.APP_ENV;
export const APP_SCHEMA = Config.APP_SCHEMA;
export const API_LEADS_BASE_URL = Config.API_LEADS_BASE_URL;
export const API_PROSPECTS_BASE_URL = Config.API_PROSPECTS_BASE_URL;

export enum EEnvironment {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}
