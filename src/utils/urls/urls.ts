export enum URLS {
    URL = 'http://localhost:3003',
    REGISTER_URL = '/api/users',
    LOGIN_URL = '/api/users/login',
}

export const getUrl = (url : string) : string => {
    return URLS.URL + url
}