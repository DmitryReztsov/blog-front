import React, { FC, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addArticle, getArticle, loadArticle } from '../../../store/article/actions';
import { useTypedSelector } from '../../../store/selectors';

import Container from '../../Container/Container';
import FormTag from '../../Tags/FormTag/FormTag';

import './Editor.scss';

const Editor: FC = () => {
  // form fields
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);

  // error form
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const [checkUnique, setCheckUnique] = useState<boolean>(false);
  const [creatingArticle, setCreatingArticle] = useState<boolean>(false);

  // tag form
  const [tag, setTag] = useState<string>('');
  const tagInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { articles, loading, error } = useTypedSelector((state) => state.article);

  const navigate = useNavigate();

  // send form fields to server and add new Article
  const saveArticle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    submitForm();
  };

  // check form fields
  const submitForm = () => {
    if (!title.trim()) {
      setErrorForm("title can't be blank");
      return false;
    }
    if (!description.trim()) {
      setErrorForm("description can't be blank");
      return false;
    }
    if (!body.trim()) {
      setErrorForm("body can't be blank");
      return false;
    }

    checkTitleUnique(title);
  };

  // check title unique
  const checkTitleUnique = async (title: string) => {
    setCheckUnique(true);
    dispatch(loadArticle());
    dispatch(getArticle(title));
  };

  // check unique title by loading articles
  useEffect(() => {
    if (articles && !loading && checkUnique) {
      let unique = true;

      articles.map((el: any) => {
        if (el.title.toLowerCase() === title.trim().toLowerCase()) {
          unique = false;
        }
      });
      if (!unique) {
        setCheckUnique(false);
        setErrorForm('title must be unique');
      } else {
        setCheckUnique(false);
        setErrorForm(null);
        dispatch(addArticle({ title, description, body, tagList }));
        setCreatingArticle(true);
      }
    }
  }, [checkUnique, loading]);

  // redirect to new article
  useEffect(() => {
    if (creatingArticle) {
      if (!loading && !error) {
        console.log('create & redirect');
        setCreatingArticle(false);
        setTimeout(() => navigate(`article/${title}`), 1500);
      }
    }
  }, [creatingArticle, loading]);

  // Save form fileds
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

  // Reacting to change of tag-list
  useEffect(() => {
    showTagList();
  }, [tagList]);

  return (
    <div className="Editor">
      <Container>
        <div className="Editor-row">
          <form className="Editor-form" onChange={changeFormHandler}>
            {errorForm && <li className="Editor-form__error">{errorForm}</li>}

            <input
              className="Editor-form__title"
              name="title"
              type="text"
              placeholder="Article Title"
              defaultValue={title}
            />

            <input
              className="Editor-form__description"
              name="description"
              type="text"
              placeholder="What's this article about?"
              defaultValue={description}
            />

            <textarea
              className="Editor-form__body"
              name="body"
              placeholder="Write your article (in markdown)"
              defaultValue={body}
            />

            <input
              className="Editor-form__tags"
              ref={tagInput}
              name="tag"
              type="text"
              defaultValue={tag}
              placeholder="Enter tags"
              onKeyPress={addTag}
            />

            <ul className="Editor-form__tag-list">{showTagList()}</ul>

            <div className="Editor-form__bottom">
              <button className="Editor-form__button" onClick={saveArticle}>
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
