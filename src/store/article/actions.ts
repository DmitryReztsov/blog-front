import { Dispatch } from 'redux';
import fetchAction from './fetchAction';
import { createFetchOptions } from './createFetchOptions';
import { ArticleActionTypes, ArticleAction, IArticle, URLS, IArticleState } from './types';

// add article
export const addArticle = (body: IArticle) => async (dispatch: Dispatch<ArticleAction>) => {
  const { addArticleOptions } = createFetchOptions();

  const { error } = await fetchAction(URLS.ADD_ARTICLE_URL, addArticleOptions(body));

  if (error) {
    throw new Error("Can't create article: " + error);
  }
  dispatch({ type: ArticleActionTypes.ADD_ARTICLE, payload: { loading: true, error } });
};

// remove article
export function removeArticle(slug: string) {
  {
    type: ArticleActionTypes.REMOVE_ARTICLE;
  }
}

// loading article
export const loadArticle = () => (dispatch: Dispatch<ArticleAction>) => {
  {
    dispatch({ type: ArticleActionTypes.GET_ARTICLE, payload: { loading: true } });
  }
};

// get article by title
export const getArticle = (title: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { getArticleOptions } = createFetchOptions();
  const url = URLS.GET_ARTICLE_URL + title;

  const { data, error } = await fetchAction(url, getArticleOptions());

  if (error) {
    throw new Error("Can't get article: " + error);
  }

  dispatch({
    type: ArticleActionTypes.GET_ARTICLE,
    payload: { articles: data, error, loading: false },
  });
};

// get user articles
export const getUserArticles = (author: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { getUserArticlesOptions } = createFetchOptions();
  const url = URLS.GET_USER_ARTICLES_URL + author;

  const { data, error } = await fetchAction(url, getUserArticlesOptions());

  if (error) {
    throw new Error("Can't get article: " + error);
  }

  dispatch({ type: ArticleActionTypes.GET_USER_ARTICLES, payload: { articles: data, error } });
};

// get global articles
export const getGlobalArticles = () => async (dispatch: Dispatch<ArticleAction>) => {
  const { getGlobalArticlesOptions } = createFetchOptions();

  const { data, error } = await fetchAction(
    URLS.GET_GLOBAL_ARTICLES_URL,
    getGlobalArticlesOptions()
  );

  if (error) {
    throw new Error("Can't get articles: " + error);
  }

  dispatch({ type: ArticleActionTypes.GET_GLOBAL_ARTICLES, payload: { articles: data, error } });
};
