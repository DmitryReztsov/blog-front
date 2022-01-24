import React, { FC, useEffect, useState } from 'react';
import Container from '../../Container/Container';
import './Editor.scss';

const Editor: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  const descriptionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.currentTarget.value);
  };

  const textChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.currentTarget.value);
  };

  const tagsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTags(e.currentTarget.value);
  };

  const getClassname = (disabled: boolean): string => {
    return disabled ? 'Editor-form__submit submit submit_disabled' : 'Editor-form__submit submit';
  };

  useEffect(() => {
    if (title && description && text) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, description, text]);

  return (
    <div className={'Editor'}>
      <Container>
        <div className={'Editor-body'}>
          <form className={'Editor-form form'} onSubmit={submitHandler}>
            <input
              className={'Editor-form__input input'}
              name={'title'}
              type="text"
              placeholder={'Article Title'}
              value={title}
              onChange={titleChangeHandler}
            />
            <input
              className={'Editor-form__input input'}
              name={'description'}
              type="text"
              placeholder={"What's this article about?"}
              value={description}
              onChange={descriptionChangeHandler}
            />
            <textarea
              className={'Editor-form__textarea textarea'}
              name={'text'}
              placeholder={'Write your article (in markdown)'}
              value={text}
              onChange={textChangeHandler}
            ></textarea>
            <input
              className={'Editor-form__input input'}
              name={'tags'}
              type="text"
              placeholder={'Enter tags'}
              value={tags}
              onChange={tagsChangeHandler}
            />
            <button className={getClassname(disabled)} type={'submit'} disabled={disabled}>
              Publish Article
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Editor;
