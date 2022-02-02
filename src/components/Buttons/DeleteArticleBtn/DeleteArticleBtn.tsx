import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeArticle, setFetchMode } from '../../../store/article/actions';
import { FETCH_MODE } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';
import './DeleteArticleBtn.scss';

interface IDeleteArticleBtnProps {
  slug: string;
}

const DeleteArticleBtn: FC<IDeleteArticleBtnProps> = ({ slug }) => {
  const { fetchMode } = useTypedSelector((state) => state.article);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // delete article and redirect to home
  const deleteArticle = () => {
    dispatch(setFetchMode(FETCH_MODE.FETCHING));
    dispatch(removeArticle(slug));
  };

  useEffect(() => {
    if (fetchMode === FETCH_MODE.FETCHED) {
      dispatch(setFetchMode(FETCH_MODE.RELAXED));
      navigate(`/`);
    }
  }, [fetchMode]);

  return (
    <button className="DeleteArticleBtn" onClick={deleteArticle}>
      <i className="ion-trash-a"></i>&nbsp;Delete Article
    </button>
  );
};

export default DeleteArticleBtn;
