import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment, setFormFetchMode } from '../../../store/article/actions';
import { FORM_FETCH_MODE } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';
import { URLS } from '../../../utils/urls/urls';
import FormError from '../../Errors/FormError/FormError';
import './CommentForm.scss';

interface ICommentFormProps {
  slug: string;
}

const CommentForm: FC<ICommentFormProps> = ({ slug }) => {
  const { formFetchMode } = useTypedSelector((state) => state.article);
  const { user } = useTypedSelector((state) => state.user);
  // form states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [body, setBody] = useState<string>('');

  const dispatch = useDispatch();

  // save body for chanching one
  const changeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  };

  // add comment
  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!body.trim()) {
      return setErrorMessage("body can't be blank");
    }
    setErrorMessage(null);
    setBody('');
    dispatch(setFormFetchMode(FORM_FETCH_MODE.FETCHING));
    dispatch(addComment(slug, body));
  };

  return (
    <>
      <div className="CommentForm">
        {!user ? (
          <p className="CommentForm-unauthorise">
            <Link to={'/login'} className="CommentForm-unauthorise__link">
              Sign in
            </Link>{' '}
            or{' '}
            <Link to={'/register'} className="CommentForm-unauthorise__link">
              sign up
            </Link>{' '}
            to add comments on this article
          </p>
        ) : (
          <>
            <div className="CommentForm-error__block">
              {errorMessage && <FormError text={errorMessage} />}
            </div>

            <form className="CommentForm-form">
              <textarea
                className="CommentForm-body"
                name="body"
                placeholder="Write a comment..."
                value={body}
                onChange={changeHandler}
                disabled={formFetchMode === FORM_FETCH_MODE.FETCHING ? true : false}
              ></textarea>

              <div className="CommentForm-panel">
                <img className="CommentForm-panel__icon" src={URLS.DEFAULT_LOGO} alt="smile" />

                {user && (
                  <button
                    className="CommentForm-panel__btn"
                    onClick={submitForm}
                    disabled={formFetchMode === FORM_FETCH_MODE.FETCHING ? true : false}
                  >
                    Post Comment
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default CommentForm;
