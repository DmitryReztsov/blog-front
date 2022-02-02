export interface IArticle {
  slug?: String;
  title: String;
  description: String;
  body: String;
  author?: { username: String };
  tagList: string[] | [];
  favoritesCount?: Number;
  comments?: string[] | [];
  createdAt?: string;
}

export interface IArticleState {
  articles: IArticle[] | undefined;
  feedArticles: IArticle[] | undefined;
  editArticle: IArticle | undefined;
  editorMode: EDITOR_MODE;
  tags: string[] | undefined;
  error: Error | undefined;
  fetchMode: FETCH_MODE;
}

export type ArticleAction = {
  type: string;
  payload?: any;
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
  SET_FETCH_MODE = 'SET_FETCH_MODE',
}

export enum URLS {
  ADD_ARTICLE_URL = '/api/articles',
  UPDATE_ARTICLE = '/api/articles/',
  REMOVE_ARTICLE_URL = '/api/articles/',
  GET_ARTICLE_URL = '/api/articles?',
  GET_USER_ARTICLES_URL = '/api/articles?author=',
  GET_FEED_ARTICLES_URL = '/api/articles/feed',
  GET_GLOBAL_ARTICLES_URL = '/api/articles',
  GET_TAGS_URL = '/api/tags',
}

export enum ARTICLE_LIST_MODE {
  FEED_MODE = 'FEED_MODE',
  GLOBAL_MODE = 'GLOBAL_MODE',
  TAG_MODE = 'TAG_MODE',
}

export enum EDITOR_MODE {
  CREATE_MODE = 'CREATE_MODE',
  EDIT_MODE = 'EDIT_MODE',
}

export enum FETCH_MODE {
  RELAXED = 'RELAXED',
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
}

export type fetchOptions = {
  method: string;
  headers: { 'Content-Type': string; Authorization?: string };
  body?: any;
};
