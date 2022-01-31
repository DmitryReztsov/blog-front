import { ArticleAction, ArticleActionTypes, IArticleState } from './types';

const initialState: IArticleState = {
  articles: undefined,
  error: undefined,
  loading: false,
};

export function articleReducer(state: IArticleState = initialState, action: ArticleAction): any {
  switch (action.type) {
    case ArticleActionTypes.ADD_ARTICLE:
      return action.payload.loading;

    case ArticleActionTypes.REMOVE_ARTICLE:
      return state;

    case ArticleActionTypes.LOAD_ARTICLE:
      return action.payload.loading;

    case ArticleActionTypes.GET_ARTICLE:
      return { ...state, ...action.payload.articles };

    case ArticleActionTypes.GET_USER_ARTICLES:
      return action.payload.articles;

    case ArticleActionTypes.GET_GLOBAL_ARTICLES:
      return action.payload.articles;

    default:
      return state;
  }
}
