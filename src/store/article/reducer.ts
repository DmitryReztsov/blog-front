import { ArticleAction, ArticleActionTypes, EDITOR_MODE, FETCH_MODE, IArticleState } from './types';

const initialState: IArticleState = {
  articles: undefined,
  feedArticles: undefined,
  editArticle: undefined,
  editorMode: EDITOR_MODE.CREATE_MODE,
  tags: undefined,
  error: undefined,
  fetchMode: FETCH_MODE.RELAXED,
  comments: [],
};

export function articleReducer(state: IArticleState = initialState, action: ArticleAction): any {
  switch (action.type) {
    case ArticleActionTypes.ADD_ARTICLE:
      return { ...state, ...action.payload.articles, fetchMode: action.payload.fetchMode };

    case ArticleActionTypes.UPDATE_ARTICLE:
      return { ...state, ...action.payload.articles, fetchMode: action.payload.fetchMode };

    case ArticleActionTypes.REMOVE_ARTICLE:
      return { ...state, ...action.payload.articles, fetchMode: action.payload.fetchMode };

    // case ArticleActionTypes.GET_ARTICLE:
    //   return { ...state, error: action.payload.user };

    case ArticleActionTypes.SET_EDIT_ARTICLE:
      return { ...state, editArticle: action.payload.editArticle };

    case ArticleActionTypes.SET_EDITOR_MODE:
      return { ...state, editorMode: action.payload.editorMode };

    case ArticleActionTypes.GET_USER_ARTICLES:
      return { ...state, ...action.payload.articles };

    case ArticleActionTypes.GET_FEED_ARTICLES:
      return { ...state, feedArticles: action.payload.feedArticles.articles };

    case ArticleActionTypes.GET_GLOBAL_ARTICLES:
      return { ...state, ...action.payload.articles };

    case ArticleActionTypes.GET_TAGS:
      return { ...state, ...action.payload.tags };

    case ArticleActionTypes.SET_FETCH_MODE:
      return { ...state, fetchMode: action.payload.fetchMode };

    case ArticleActionTypes.FAVORITE_ARTICLE:
      return { ...state, ...action.payload.articles, fetchMode: action.payload.fetchMode };

    case ArticleActionTypes.UNFAVORITE_ARTICLE:
      return { ...state, ...action.payload.articles, fetchMode: action.payload.fetchMode };

    case ArticleActionTypes.ADD_COMMENT:
      return { ...state, ...action.payload.comments, ...action.payload.fetchMode };

    case ArticleActionTypes.DELETE_COMMENT:
      return { ...state, ...action.payload.comments, ...action.payload.fetchMode };

    case ArticleActionTypes.GET_COMMENTS:
      return { ...state, ...action.payload.comments };

    default:
      return state;
  }
}
