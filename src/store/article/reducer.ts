import { ArticleAction, ArticleActionTypes, IArticleState } from './types';

const initialState: IArticleState = {
  articles: [],
  loading: false,
  error: null,
};

export function articleReducer(
  state: IArticleState = initialState,
  action: ArticleAction
): IArticleState {
  switch (action.type) {
    case ArticleActionTypes.CREATE_ARTICLE: {
      return state;
    }

    default: {
      return state;
    }
  }
}
