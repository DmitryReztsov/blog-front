import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { removeArticle } from '../../../store/article/actions';
import './DeleteArticleBtn.scss';

interface IDeleteArticleBtnProps {
  slug: string;
}

const DeleteArticleBtn: FC<IDeleteArticleBtnProps> = ({ slug }) => {
  const dispatch = useDispatch();
  const deleteArticle = () => {
    return dispatch(removeArticle(slug));
  };
  return (
    <button className="DeleteArticleBtn" onClick={deleteArticle}>
      <i className="ion-trash-a"></i>&nbsp;Delete Article
    </button>
  );
};

export default DeleteArticleBtn;
