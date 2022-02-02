import { Dispatch } from 'redux';
import fetchAction from './fetchAction';
import { createFetchOptions } from './createFetchOptions';
import {
  ArticleActionTypes,
  ArticleAction,
  IArticle,
  URLS,
  EDITOR_MODE,
  FETCH_MODE,
} from './types';

// add article
export const addArticle = (body: IArticle) => async (dispatch: Dispatch<ArticleAction>) => {
  const { addArticleOptions } = createFetchOptions();
  const { getGlobalArticlesOptions } = createFetchOptions();

  await fetchAction(URLS.ADD_ARTICLE_URL, addArticleOptions(body));

  const { data, error } = await fetchAction(
    URLS.GET_GLOBAL_ARTICLES_URL,
    getGlobalArticlesOptions()
  );

  if (error) {
    throw new Error("Can't add article: " + error);
  }

  dispatch({
    type: ArticleActionTypes.ADD_ARTICLE,
    payload: { articles: data, fetchMode: FETCH_MODE.FETCHED },
  });
};

// update article
export const updateArticle =
  (body: IArticle, slug: string) => async (dispatch: Dispatch<ArticleAction>) => {
    const { updateArticleOptions } = createFetchOptions();
    const { getGlobalArticlesOptions } = createFetchOptions();
    const url = URLS.UPDATE_ARTICLE + slug;
    console.log(body);
    await fetchAction(url, updateArticleOptions(body));

    const { data, error } = await fetchAction(
      URLS.GET_GLOBAL_ARTICLES_URL,
      getGlobalArticlesOptions()
    );

    if (error) {
      throw new Error("Can't update article: " + error);
    }

    dispatch({
      type: ArticleActionTypes.UPDATE_ARTICLE,
      payload: { articles: data, fetchMode: FETCH_MODE.FETCHED },
    });
  };

// remove article
export const removeArticle = (slug: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { removeArticleOptions } = createFetchOptions();
  const { getGlobalArticlesOptions } = createFetchOptions();
  const url = URLS.REMOVE_ARTICLE_URL + slug;

  await fetchAction(url, removeArticleOptions());

  const { data, error } = await fetchAction(
    URLS.GET_GLOBAL_ARTICLES_URL,
    getGlobalArticlesOptions()
  );

  if (error) {
    throw new Error("Can't update article: " + error);
  }

  {
    dispatch({
      type: ArticleActionTypes.REMOVE_ARTICLE,
      payload: { articles: data, fetchMode: FETCH_MODE.FETCHED },
    });
  }
};

// get article
export const getArticle = (slug: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { getArticleOptions } = createFetchOptions();
  const url = URLS.GET_ARTICLE_URL + slug;

  const { data, error } = await fetchAction(url, getArticleOptions());

  if (error) {
    throw new Error("Can't get article: " + error);
  }

  dispatch({
    type: ArticleActionTypes.GET_ARTICLE,
    payload: { articles: data, error, loading: false },
  });
};

// set article for edition
export const setEditArticle = (article: IArticle) => (dispatch: Dispatch<ArticleAction>) => {
  dispatch({
    type: ArticleActionTypes.SET_EDIT_ARTICLE,
    payload: { editArticle: article },
  });
};

// set mode of editor
export const setEditorMode = (editorMode: EDITOR_MODE) => (dispatch: Dispatch<ArticleAction>) => {
  dispatch({
    type: ArticleActionTypes.SET_EDITOR_MODE,
    payload: { editorMode },
  });
};

// get user articles
export const getUserArticles = (author: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { getUserArticlesOptions } = createFetchOptions();
  const url = URLS.GET_USER_ARTICLES_URL + author;

  const { data, error } = await fetchAction(url, getUserArticlesOptions());

  if (error) {
    throw new Error("Can't get user articles: " + error);
  }

  dispatch({ type: ArticleActionTypes.GET_USER_ARTICLES, payload: { articles: data, error } });
};

// get feed articles
export const getFeedArticles = () => async (dispatch: Dispatch<ArticleAction>) => {
  const { getFeedArticlesOptions } = createFetchOptions();
  const url = URLS.GET_FEED_ARTICLES_URL;

  const { data, error } = await fetchAction(url, getFeedArticlesOptions());

  if (error) {
    throw new Error("Can't get feed articles: " + error);
  }

  dispatch({ type: ArticleActionTypes.GET_FEED_ARTICLES, payload: { feedArticles: data, error } });
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

// get tags
export const getTags = () => async (dispatch: Dispatch<ArticleAction>) => {
  const { getTagsOptions } = createFetchOptions();

  const { data, error } = await fetchAction(URLS.GET_TAGS_URL, getTagsOptions());

  if (error) {
    throw new Error("Can't get articles: " + error);
  }

  dispatch({ type: ArticleActionTypes.GET_TAGS, payload: { tags: data, error } });
};

// set fetch mode
export const setFetchMode = (fetchMode: FETCH_MODE) => (dispatch: Dispatch<ArticleAction>) => {
  dispatch({ type: ArticleActionTypes.SET_FETCH_MODE, payload: { fetchMode } });
};
