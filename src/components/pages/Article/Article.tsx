import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import {
  addComment,
  getComments,
  getGlobalArticles,
  setFetchMode,
} from '../../../store/article/actions';

import Container from '../../Container/Container';
import DeleteArticleBtn from '../../Buttons/DeleteArticleBtn/DeleteArticleBtn';
import ArticlePageTag from '../../Tags/ArticlePageTag/ArticlePageTag';

import './Article.scss';
import EditArticleBtn from '../../Buttons/EditArticleBtn/EditArticleBtn';
import FolowUserBtn from '../../Buttons/FolowUserBtn/FolowUserBtn';
import FavoriteArticleBtn from '../../Buttons/FavoriteArticleBtn/FavoriteArticleBtn';
import { FAVORITE_BTN_MODE, FETCH_MODE, IArticle } from '../../../store/article/types';
import ArticleIcon from '../../Articles/ArticleIcon/ArticleIcon';
import ArticleUsername from '../../Articles/ArticleUsername/ArticleUsername';
import { URLS } from '../../../utils/urls/urls';
import CommentCard from '../../Comments/CommentCard/CommentCard';
import ArticleDate from '../../Articles/ArticleDate/ArticleDate';
import FormError from '../../Errors/FormError/FormError';
import e from 'express';

const Article: FC = () => {
  const { articles, fetchMode, comments } = useTypedSelector((state) => state.article);
  const { user } = useTypedSelector((state) => state.user);
  const [article, setArticle] = useState<IArticle>();
  const [articleComments, setArticleComments] = useState<any[]>([]);

  // form states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [body, setBody] = useState<string>('');

  useEffect(() => {
    // console.log('articles', articles);
    console.log('fetchMode', fetchMode);
  }, [fetchMode]);

  useCallback(() => {
    if (fetchMode === FETCH_MODE.FETCHED) {
      dispatch(setFetchMode(FETCH_MODE.RELAXED));
    }
  }, [fetchMode]);

  // get route params
  const params = useParams();
  const title = params.title;
  const dispatch = useDispatch();

  useEffect(() => {
    if (article) {
      dispatch(getComments(article!.slug!));
    }

    if (fetchMode === FETCH_MODE.FETCHED) {
      dispatch(setFetchMode(FETCH_MODE.RELAXED));
      console.log('relax and get comments');
      dispatch(getComments(article!.slug!));
    }
  }, [article, fetchMode]);

  useEffect(() => {
    if (comments) {
      setArticleComments(comments);
    }
  }, [comments]);

  useEffect(() => {
    articles.map((el: any) => {
      if (el.title.trim().toLowerCase() === title!.trim().toLowerCase()) {
        setArticle(el);
      }
    });
  }, []);

  const changeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!body.trim()) {
      return setErrorMessage("body can't be blank");
    }
    setErrorMessage(null);
    setBody('');
    dispatch(setFetchMode(FETCH_MODE.FETCHING));
    dispatch(addComment(article!.slug!, body));
  };

  return (
    <>
      <div className="Article">
        <div className="Article-top">
          <Container>
            <div className="Article-top__row">
              <h1 className="Article-top__title">{article && article?.title}</h1>
              <div className="Article-top__panel">
                <div className="Article-top__userBlock">
                  <ArticleIcon username={article && article?.author?.username} />
                  <div className="Article-top__props">
                    <ArticleUsername
                      username={article && article.author?.username}
                      color={'white'}
                    />
                    <div className="Article-top__props_date">
                      {article && <ArticleDate date={article.createdAt} />}
                    </div>
                  </div>
                </div>
                {article && user?.username === article?.author?.username ? (
                  <>
                    <EditArticleBtn article={article} />
                    <DeleteArticleBtn slug={article && article.slug} />
                  </>
                ) : (
                  <>
                    <FolowUserBtn username={article && article.author?.username} />
                    <FavoriteArticleBtn
                      article={article && article}
                      mode={FAVORITE_BTN_MODE.ARTICLE_MODE}
                    />
                  </>
                )}
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="Article-content">
            <div className="Article-content__body">{article && article?.body}</div>
            <div className="Article-content__tag-list">
              {article &&
                article.tagList.map((el: string, i: number) => <ArticlePageTag key={i} tag={el} />)}
            </div>
            <hr className="Article-content__line" />
            <div className="Article-content__panel">
              <div className="Article-content__userBlock">
                <ArticleIcon username={article && article?.author?.username} />
                <div className="Article-content__props">
                  <ArticleUsername username={article && article.author?.username} />
                  <div className="Article-content__props_date">
                    {article && <ArticleDate date={article.createdAt} />}
                  </div>
                </div>
              </div>
              {article && user?.username === article?.author?.username ? (
                <>
                  <EditArticleBtn article={article} />
                  <DeleteArticleBtn slug={article && article.slug} />
                </>
              ) : (
                <>
                  <FolowUserBtn username={article && article.author?.username} />
                  <FavoriteArticleBtn
                    article={article && article}
                    mode={FAVORITE_BTN_MODE.ARTICLE_MODE}
                  />
                </>
              )}
            </div>
          </div>
        </Container>

        <Container>
          <div className="Article-bottom">
            <div className="Article-bottom__error_block">
              {errorMessage && <FormError text={errorMessage} />}
            </div>

            <form className="Article-bottom__form">
              <textarea
                className="Article-bottom__form_body"
                name="body"
                placeholder="Write a comment..."
                value={body}
                onChange={changeHandler}
                disabled={fetchMode === FETCH_MODE.FETCHING ? true : false}
              ></textarea>

              <div className="Article-bottom__form_footer">
                <img className="Article-bottom__form_icon" src={URLS.DEFAULT_LOGO} alt="smile" />

                {user && (
                  <button
                    className="Article-bottom__form_btn"
                    onClick={submitForm}
                    disabled={fetchMode === FETCH_MODE.FETCHING ? true : false}
                  >
                    Post Comment
                  </button>
                )}
              </div>
            </form>
            {articleComments &&
              articleComments.map((el, i) => (
                <CommentCard
                  key={i}
                  text={el.body}
                  username={el.author.username}
                  date={el.createdAt}
                  slug={article!.slug}
                  id={el.id}
                />
              ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Article;
