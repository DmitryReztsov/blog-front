export interface IArticle {
  slug?: String;
  title: String;
  description: String;
  body: String;
  author?: String;
  tagList: string[] | [];
  favoritesCount?: Number;
  comments?: string[] | [];
}

export interface IArticleState {
  articles: IArticle[] | undefined;
  error: Error | undefined;
  loading: boolean;
}

export type ArticleAction = {
  type: string;
  payload?: any;
};

export enum ArticleActionTypes {
  ADD_ARTICLE = 'ADD_ARTICLE',
  REMOVE_ARTICLE = 'REMOVE_ARTICLE',
  LOAD_ARTICLE = 'LOAD_ARTICLE',
  GET_ARTICLE = 'GET_ARTICLE',
  GET_USER_ARTICLES = 'GET_USER_ARTICLES',
  GET_GLOBAL_ARTICLES = 'GET_GLOBAL_ARTICLES',
}

export enum URLS {
  ADD_ARTICLE_URL = '/api/articles',
  REMOVE_ARTICLE_URL = '/api/articles/',
  GET_ARTICLE_URL = '/api/articles?title=',
  GET_USER_ARTICLES_URL = '/api/articles?author=',
  GET_GLOBAL_ARTICLES_URL = '/api/articles',
}

export enum ARTICLE_LIST_MODE {
  USER_MODE = 'USER_MODE',
  GLOBAL_MODE = 'GLOBAL_MODE',
  TAG_MODE = 'TAG_MODE',
}

export type fetchOptions = {
  method: string;
  headers: { 'Content-Type': string; Authorization?: string };
  body?: any;
};
