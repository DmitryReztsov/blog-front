import React, { FC, useEffect, useState } from 'react';
import { createArticle } from '../../../store/article/actions';
import Container from '../../Container/Container';
import './Editor.scss';
import { useDispatch } from 'react-redux';

const Editor: FC = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(createArticle(title, description, text, tags));
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

  const tagChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTag(e.currentTarget.value);
  };

  const tagsKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      setTags((state) => {
        if (!state.includes(tag)) {
          state.push(tag);
        }
        return state;
      });
      setTag('');
    }
  };

  const getClassname = (disabled: boolean): string => {
    return disabled
      ? 'Editor-form__submit form__submit submit submit_disabled'
      : 'Editor-form__submit form__submit submit';
  };

  const deleteTag = (wrongTag: string) => {
    const filteredTags = tags.filter((tag) => tag !== wrongTag);
    setTags(filteredTags);
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
              className={'Editor-form__input form__input input'}
              name={'title'}
              type="text"
              placeholder={'Article Title'}
              value={title}
              onChange={titleChangeHandler}
            />
            <input
              className={'Editor-form__input form__input input input_small'}
              name={'description'}
              type="text"
              placeholder={"What's this article about?"}
              value={description}
              onChange={descriptionChangeHandler}
            />
            <textarea
              className={'Editor-form__textarea form__textarea textarea textarea_small'}
              name={'text'}
              placeholder={'Write your article (in markdown)'}
              value={text}
              onChange={textChangeHandler}
            />
            <input
              className={'Editor-form__input form__input input input_small'}
              name={'tags'}
              type="text"
              value={tag}
              placeholder={'Enter tags'}
              onChange={tagChangeHandler}
              onKeyDown={tagsKeyHandler}
            />
            <ul className={'Editor-form__taglist taglist'}>
              {tags.map((tag) => {
                return (
                  <li key={tag} className={'taglist__elem'}>
                    <span className={'taglist__button'} onMouseDown={() => deleteTag(tag)}>
                      x
                    </span>
                    {tag}
                  </li>
                );
              })}
            </ul>
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
