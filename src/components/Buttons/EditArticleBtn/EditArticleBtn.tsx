import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditArticle, setEditorMode } from '../../../store/article/actions';
import { EDITOR_MODE, IArticle, IArticleState } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';
import './EditArticleBtn.scss';

interface IEditArticleBtnPpops {
  article: IArticle;
}

const EditArticleBtn: FC<IEditArticleBtnPpops> = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editArticle, editorMode } = useTypedSelector<IArticleState>((state) => state.article);

  const changeArticle = () => {
    dispatch(setEditArticle(article));
    dispatch(setEditorMode(EDITOR_MODE.EDIT_MODE));
    navigate(`/editor`);
  };

  return (
    <button className="EditArticleBtn" onClick={changeArticle}>
      <i className="ion-edit"></i>&nbsp;Edit Article
    </button>
  );
};

export default EditArticleBtn;
