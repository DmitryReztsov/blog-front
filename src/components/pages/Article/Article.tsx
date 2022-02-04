import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import {
  getGlobalArticles,
  setButtonFetchMode,
  setFormFetchMode,
} from '../../../store/article/actions';

import Container from '../../Container/Container';
import DeleteArticleBtn from '../../Buttons/DeleteArticleBtn/DeleteArticleBtn';
import ArticlePageTag from '../../Tags/ArticlePageTag/ArticlePageTag';

import './Article.scss';
import EditArticleBtn from '../../Buttons/EditArticleBtn/EditArticleBtn';
import FolowUserBtn from '../../Buttons/FolowUserBtn/FolowUserBtn';
import FavoriteArticleBtn from '../../Buttons/FavoriteArticleBtn/FavoriteArticleBtn';
import {
  BUTTON_FETCH_MODE,
  FAVORITE_BTN_MODE,
  FORM_FETCH_MODE,
  IArticle,
} from '../../../store/article/types';
import ArticleIcon from '../../Articles/ArticleIcon/ArticleIcon';
import ArticleUsername from '../../Articles/ArticleUsername/ArticleUsername';

import ArticleDate from '../../Articles/ArticleDate/ArticleDate';
import NotFound from '../NotFound/NotFound';
import CommentForm from '../../Forms/CommentForm/CommentForm';
import CommentList from '../../Comments/CommentList/CommentList';

const Article: FC = () => {
  const { articles, buttonFetchMode, formFetchMode } = useTypedSelector((state) => state.article);
  const { user } = useTypedSelector((state) => state.user);
  const [article, setArticle] = useState<IArticle>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get route params
  const params = useParams();

  useEffect(() => {
    if (buttonFetchMode === BUTTON_FETCH_MODE.FETCHED) {
      dispatch(setButtonFetchMode(BUTTON_FETCH_MODE.NO_FETCH));
      dispatch(getGlobalArticles());
    }
  }, [buttonFetchMode]);

  useEffect(() => {
    if (formFetchMode === FORM_FETCH_MODE.FETCHED) {
      dispatch(setFormFetchMode(FORM_FETCH_MODE.NO_FETCH));
      dispatch(getGlobalArticles());
    }
  }, [formFetchMode]);

  useEffect(() => {
    if (
      buttonFetchMode === BUTTON_FETCH_MODE.FETCHED &&
      formFetchMode === FORM_FETCH_MODE.FETCHING
    ) {
      dispatch(setFormFetchMode(FORM_FETCH_MODE.NO_FETCH));
      dispatch(setButtonFetchMode(BUTTON_FETCH_MODE.NO_FETCH));
      dispatch(getGlobalArticles());
    }
  }, [formFetchMode, buttonFetchMode]);

  useEffect(() => {
    if (articles) {
      let flag = false;
      articles.map((el: any) => {
        if (el.title.trim().toLowerCase() === params.title!.trim().toLowerCase()) {
          setArticle(el);
          flag = true;
        }
      });

      flag ? false : navigate('/');
    }
  }, [articles]);

  if (!article)
    return (
      <>
        <NotFound />
      </>
    );

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
            <CommentForm slug={article!.slug!} />
            <CommentList slug={article!.slug!} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Article;
