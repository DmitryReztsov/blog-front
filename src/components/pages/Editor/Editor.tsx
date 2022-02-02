import React, { FC, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import {
  addArticle,
  getGlobalArticles,
  setEditorMode,
  setFetchMode,
  updateArticle,
} from '../../../store/article/actions';

import Container from '../../Container/Container';
import FormTag from '../../Tags/FormTag/FormTag';

import './Editor.scss';
import { EDITOR_MODE, FETCH_MODE, IArticle } from '../../../store/article/types';

const Editor: FC = () => {
  // states from store
  const { articles, editArticle, editorMode, fetchMode } = useTypedSelector(
    (state) => state.article
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form fields
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);

  // tag form
  const [tag, setTag] = useState<string>('');
  const tagInput = useRef<HTMLInputElement>(null);

  // error form
  const [errorForm, setErrorForm] = useState<string | null>(null);

  /* ----- Edition article mode ----- */
  useEffect(() => {
    if (editorMode === EDITOR_MODE.EDIT_MODE && editArticle) {
      setTitle(editArticle.title);
      setDescription(editArticle.description);
      setBody(editArticle.body);
      setTagList(editArticle.tagList);
    }
  }, []);

  const saveChanges = () => {
    setErrorForm(null);
    dispatch(setEditorMode(EDITOR_MODE.CREATE_MODE));
    dispatch(setFetchMode(FETCH_MODE.FETCHING));
    dispatch(updateArticle({ title, description, body, tagList }, editArticle.slug));
  };

  /* ----- Creating article mode ----- */
  useEffect(() => {
    dispatch(getGlobalArticles());
  }, []);

  useEffect(() => {
    if (fetchMode === FETCH_MODE.FETCHED) {
      dispatch(setFetchMode(FETCH_MODE.RELAXED));
      navigate(`/article/${title}`);
    }
  }, [fetchMode]);

  // add new Article
  const createArticle = (): void => {
    setErrorForm(null);
    dispatch(setFetchMode(FETCH_MODE.FETCHING));
    dispatch(addArticle({ title, description, body, tagList }));
  };

  // check form fields
  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(title, description, body, tagList);
    e.preventDefault();
    return !title.trim() // check title
      ? setErrorForm("title can't be blank")
      : !description.trim() // check description
      ? setErrorForm("description can't be blank")
      : !body.trim() // check body
      ? setErrorForm("body can't be blank")
      : !checkTitleUnique(title) // if the create mode check for uniqueness
      ? setErrorForm('title must be unique')
      : editorMode === EDITOR_MODE.EDIT_MODE // if the edit mode, save changes or create article
      ? saveChanges()
      : createArticle();
  };

  // check title for uniqueness
  const checkTitleUnique = (title: string): boolean => {
    const twin = articles.filter((el: IArticle) => {
      if (el.title.toLowerCase() === editArticle.title) return false;
      return el.title.toLowerCase() === title.trim().toLowerCase();
    });

    return !twin.length;
  };

  // save form fileds
  const changeFormHandler = (event: React.ChangeEvent<HTMLFormElement>): void => {
    const formElement: EventTarget & HTMLFormElement = event.target;

    switch (formElement.name) {
      case 'title':
        return setTitle(formElement.value);
      case 'description':
        return setDescription(formElement.value);
      case 'body':
        return setBody(formElement.value);
      case 'tag':
        return setTag(formElement.value);
    }
  };

  // Add tag to tag-list
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (tag.trim() !== '' && !tagList.includes(tag)) {
        setTagList((prev) => [...prev, tag]);
        tagInput.current!.value = '';
      }
    }
  };

  // Delete tag from tag-list
  const deleteTag = (tag: string): void => {
    const filteredTagList = tagList.filter((el) => el !== tag);
    setTagList(filteredTagList);
  };

  // Show tags in the form
  const showTagList = () => {
    if (tagList) {
      return tagList.map((el, i) => <FormTag deleteTag={deleteTag} tag={el} key={i} />);
    }
  };

  return (
    <div className="Editor">
      <Container>
        <div className="Editor-row">
          <form
            className={fetchMode === 'FETCHING' ? 'Editor-form disabled' : 'Editor-form'}
            onChange={changeFormHandler}
          >
            {errorForm && <li className="Editor-form__error">{errorForm}</li>}

            <input
              className="Editor-form__title"
              name="title"
              type="text"
              placeholder="Article Title"
              defaultValue={title}
              disabled={fetchMode === 'FETCHING' ? true : false}
            />

            <input
              className="Editor-form__description"
              name="description"
              type="text"
              placeholder="What's this article about?"
              defaultValue={description}
              disabled={fetchMode === 'FETCHING' ? true : false}
            />

            <textarea
              className="Editor-form__body"
              name="body"
              placeholder="Write your article (in markdown)"
              defaultValue={body}
              disabled={fetchMode === 'FETCHING' ? true : false}
            />

            <input
              className="Editor-form__tags"
              ref={tagInput}
              name="tag"
              type="text"
              defaultValue={tag}
              placeholder="Enter tags"
              onKeyPress={addTag}
              disabled={fetchMode === 'FETCHING' ? true : false}
            />

            <ul className="Editor-form__tag-list">{showTagList()}</ul>

            <div className="Editor-form__bottom">
              <button
                className="Editor-form__button"
                onClick={submitForm}
                disabled={fetchMode === 'FETCHING' ? true : false}
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Editor;
