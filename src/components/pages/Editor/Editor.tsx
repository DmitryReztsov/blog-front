import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGlobalArticles, setFormFetchMode, setNewArticle } from '../../../store/article/actions';
import { FORM_FETCH_MODE } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';

import Container from '../../Container/Container';
import EditorForm from '../../Forms/EditorForm/EditorForm';

import './Editor.scss';

const Editor: FC = () => {
  const { newArticle, formFetchMode } = useTypedSelector((state) => state.article);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGlobalArticles());
  }, []);

  // redirect to article page
  useEffect(() => {
    if (formFetchMode === FORM_FETCH_MODE.FETCHED && newArticle.title) {
      dispatch(setFormFetchMode(FORM_FETCH_MODE.NO_FETCH));
      dispatch(setNewArticle(''));
      navigate(`/article/${newArticle.title}`);
    }
  }, [formFetchMode]);

  return (
    <div className="Editor">
      <Container>
        <div className="Editor-row">
          <EditorForm />
        </div>
      </Container>
    </div>
  );
};

export default Editor;
