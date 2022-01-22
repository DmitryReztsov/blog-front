export enum URLS {
  SERVER_URL = 'http://localhost:3003',
  DEFAULT_LOGO = 'https://static.productionready.io/images/smiley-cyrus.jpg',
  REGISTER_URL = '/api/users',
  LOGIN_URL = '/api/users/login',
}

export const getUrl = (url: string): string => {
  return URLS.SERVER_URL + url;
};
