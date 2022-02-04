import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  favoriteArticle,
  setButtonFetchMode,
  unfavoriteArticle,
} from '../../../store/article/actions';
import { BUTTON_FETCH_MODE, FAVORITE_BTN_MODE, IArticle } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';
import './FavoriteArticleBtn.scss';

interface IFavoriteArticleBtnProps {
  article: IArticle | undefined;
  mode: FAVORITE_BTN_MODE;
}

const FavoriteArticleBtn: FC<IFavoriteArticleBtnProps> = ({ article, mode }) => {
  const { buttonFetchMode } = useTypedSelector((state) => state.article);
  const { user } = useTypedSelector((state) => state.user);
  const [text, setText] = useState<string>();
  const [favorite, setFavorite] = useState<boolean>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favoriteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      return navigate('/login');
    }
    dispatch(setButtonFetchMode(BUTTON_FETCH_MODE.FETCHING));
    article!.favorited
      ? dispatch(unfavoriteArticle(article!.slug!))
      : dispatch(favoriteArticle(article!.slug!));
  };

  useEffect(() => {
    if (article) {
      setFavorite(article!.favorited!);
    }
  }, [article]);

  useEffect(() => {
    if (mode === FAVORITE_BTN_MODE.ARTICLE_MODE) {
      favorite
        ? setText(` Unfavorite Article (${article?.favoritesCount})`)
        : setText(` Favorite Article (${article?.favoritesCount})`);
    }
    if (mode === FAVORITE_BTN_MODE.CARD_MODE) {
      setText(` (${article?.favoritesCount})`);
    }
  }, [mode, favorite]);

  return (
    <button
      className={favorite ? 'FavoriteArticleBtn favorited' : 'FavoriteArticleBtn'}
      disabled={buttonFetchMode == BUTTON_FETCH_MODE.FETCHING ? true : false}
      onClick={favoriteHandler}
    >
      <i className="ion-heart"></i>
      {text}
    </button>
  );
};

export default FavoriteArticleBtn;
