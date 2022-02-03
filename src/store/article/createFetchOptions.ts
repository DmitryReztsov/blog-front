import { getToken } from '../../utils/common/common';
import { fetchOptions, IArticle } from './types';

export const createFetchOptions = () => {
  const addArticleOptions = (data: IArticle): fetchOptions => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify({ article: data }),
    };
  };

  const updateArticleOptions = (data: IArticle): fetchOptions => {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
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
        Authorization: `Token ${getToken()}`,
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

  const favoriteArticleOptions = (): fetchOptions => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const unfavoriteArticleOptions = (): fetchOptions => {
    return {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const addCommentOptions = (data: string): fetchOptions => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify({ comment: { body: data } }),
    };
  };

  const deleteCommentOptions = (): fetchOptions => {
    return {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getCommentsOptions = (): fetchOptions => {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
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
    favoriteArticleOptions,
    unfavoriteArticleOptions,
    addCommentOptions,
    deleteCommentOptions,
    getCommentsOptions,
  };
};
