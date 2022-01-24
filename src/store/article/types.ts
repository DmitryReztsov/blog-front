import { IUser } from '../user/types';

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: IUser;
}

export interface IArticleError {
  status: number;
  text: string[];
}

export interface IArticleState {
  articles: IArticle[] | [];
  loading: boolean;
  error: IArticleError | null;
}

export enum ArticleActionTypes {
  CREATE_ARTICLE = 'CREATE_ARTICLE',
  LOADING_ARTICLE = 'LOADING_ARTICLE',
  ERROR_ARTICLE = 'ERROR_ARTICLE',
}

export type CreateArticleAction = {
  type: ArticleActionTypes.CREATE_ARTICLE;
};
export type LoadingUserAction = {
  type: ArticleActionTypes.LOADING_ARTICLE;
};

export type ErrorUserAction = {
  type: ArticleActionTypes.ERROR_ARTICLE;
  payload: IArticleError;
};

export type ArticleAction = CreateArticleAction | LoadingUserAction | ErrorUserAction;
