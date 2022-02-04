export interface IArticle {
  slug?: string;
  title: string;
  description: string;
  body: string;
  author?: { username: string };
  tagList: string[] | [];
  favoritesCount?: number;
  comments?: string[] | [];
  createdAt?: string;
  favorited?: boolean;
}

export interface IArticleState {
  articles: IArticle[] | undefined;
  feedArticles: IArticle[] | undefined;
  editArticle: IArticle | undefined;
  editorMode: EDITOR_MODE;
  tags: string[] | undefined;
  error: Error | undefined;
  formFetchMode: FORM_FETCH_MODE;
  buttonFetchMode: BUTTON_FETCH_MODE;
  comments: IComment[] | [];
  newArticle: {
    title: string;
  };
}

export type ArticleAction = {
  type: string;
  payload: any;
};

export enum ArticleActionTypes {
  ADD_ARTICLE = 'ADD_ARTICLE',
  UPDATE_ARTICLE = 'UPDATE_ARTICLE',
  REMOVE_ARTICLE = 'REMOVE_ARTICLE',
  GET_ARTICLE = 'GET_ARTICLE',
  SET_EDIT_ARTICLE = 'SET_EDIT_ARTICLE',
  SET_EDITOR_MODE = 'SET_EDITOR_MODE',
  GET_USER_ARTICLES = 'GET_USER_ARTICLES',
  GET_FEED_ARTICLES = 'GET_FEED_ARTICLES',
  GET_GLOBAL_ARTICLES = 'GET_GLOBAL_ARTICLES',
  GET_TAGS = 'GET_TAGS',
  SET_FORM_FETCH_MODE = 'SET_FORM_FETCH_MODE',
  SET_BUTTON_FETCH_MODE = 'SET_BUTTON_FETCH_MODE',
  FAVORITE_ARTICLE = 'FAVORITE_ARTICLE',
  UNFAVORITE_ARTICLE = 'UNFAVORITE_ARTICLE',
  ADD_COMMENT = 'ADD_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  GET_COMMENTS = 'GET_COMMENTS',
  SET_NEW_ARTICLE = 'SET_NEW_ARTICLE',
}

export enum URLS {
  ADD_ARTICLE_URL = '/api/articles',
  UPDATE_ARTICLE = '/api/articles/',
  REMOVE_ARTICLE_URL = '/api/articles/',
  GET_ARTICLE_URL = '/api/article',
  GET_USER_ARTICLES_URL = '/api/articles?author=',
  GET_FEED_ARTICLES_URL = '/api/articles/feed',
  GET_GLOBAL_ARTICLES_URL = '/api/articles',
  GET_TAGS_URL = '/api/tags',
  FAVORITE_ARTICLE_URL = '/api/articles/',
  UNFAVORITE_ARTICLE_URL = '/api/articles/',
  ADD_COMMENT_URL = '/api/articles/',
  DELETE_COMMENT_URL = '/api/articles/',
  GET_COMMENTS_URL = '/api/articles/',
}

export enum ARTICLE_LIST_MODE {
  HOMEPAGE_FEED_MODE = 'HOMEPAGE_FEED_MODE',
  HOMEPAGE_GLOBAL_MODE = 'HOMEPAGE_GLOBAL_MODE',
  HOMEPAGE_TAG_MODE = 'HOMEPAGE_TAG_MODE',
  PROFILE_MY_POSTS = 'PROFILE_MY_POSTS',
  PROFILE_FAVORITED_POSTS = 'PROFILE_FAVORITED_POSTS',
}

export enum EDITOR_MODE {
  CREATE_MODE = 'CREATE_MODE',
  EDIT_MODE = 'EDIT_MODE',
}

export enum FORM_FETCH_MODE {
  NO_FETCH = 'NO_FETCH',
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
}

export enum BUTTON_FETCH_MODE {
  NO_FETCH = 'NO_FETCH',
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
}

export type fetchOptions = {
  method: string;
  headers: { 'Content-Type': string; Authorization?: string };
  body?: any;
};

export enum FETCH_METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum FAVORITE_BTN_MODE {
  CARD_MODE = 'CARD_MODE',
  ARTICLE_MODE = 'ARTICLE_MODE',
}

export interface IComment {
  author: {
    username: string;
  };
  body: string;
  createdAt: string;
  id: string;
}
