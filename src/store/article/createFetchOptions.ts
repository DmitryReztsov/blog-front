import { getToken } from '../../utils/common/common';
import { fetchOptions, IArticle } from './types';

export const createFetchOptions = () => {
  const addArticleOptions = (data: IArticle): fetchOptions => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify({ article: data }),
    };
  };

  const updateArticleOptions = (data: IArticle): fetchOptions => {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify({ article: data }),
    };
  };

  const removeArticleOptions = (): fetchOptions => {
    return {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getArticleOptions = (): fetchOptions => {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getFeedArticlesOptions = (): fetchOptions => {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getUserArticlesOptions = (): fetchOptions => {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getGlobalArticlesOptions = (): fetchOptions => {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
  };

  const getTagsOptions = (): fetchOptions => {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
  };

  return {
    addArticleOptions,
    updateArticleOptions,
    removeArticleOptions,
    getArticleOptions,
    getGlobalArticlesOptions,
    getUserArticlesOptions,
    getFeedArticlesOptions,
    getTagsOptions,
  };
};
