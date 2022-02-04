import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import {
  removeArticle,
  setButtonFetchMode,
  setFormFetchMode,
} from '../../../store/article/actions';
import { BUTTON_FETCH_MODE, FORM_FETCH_MODE } from '../../../store/article/types';
import './DeleteArticleBtn.scss';

interface IDeleteArticleBtnProps {
  slug: string | undefined;
}

const DeleteArticleBtn: FC<IDeleteArticleBtnProps> = ({ slug }) => {
  const { buttonFetchMode } = useTypedSelector((state) => state.article);
  const dispatch = useDispatch();

  // delete article and redirect to home
  const deleteArticle = () => {
    dispatch(setFormFetchMode(FORM_FETCH_MODE.FETCHING));
    dispatch(setButtonFetchMode(BUTTON_FETCH_MODE.FETCHING));
    dispatch(removeArticle(slug!));
  };

  return (
    <button
      className="DeleteArticleBtn"
      onClick={deleteArticle}
      disabled={buttonFetchMode === BUTTON_FETCH_MODE.FETCHING ? true : false}
    >
      <i className="ion-trash-a"></i>&nbsp;Delete Article
    </button>
  );
};

export default DeleteArticleBtn;
