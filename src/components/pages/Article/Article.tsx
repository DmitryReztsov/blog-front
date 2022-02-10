import React, { FC, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import {
  getGlobalArticles,
  setButtonFetchMode,
  setFormFetchMode,
} from '../../../store/article/actions';
import { FAVORITE_BTN_MODE, FETCH_MODE, IArticle } from '../../../store/article/types';

import Container from '../../Container/Container';
import ArticlePageTag from '../../Tags/ArticlePageTag/ArticlePageTag';
import DeleteArticleBtn from '../../Buttons/DeleteArticleBtn/DeleteArticleBtn';
import EditArticleBtn from '../../Buttons/EditArticleBtn/EditArticleBtn';
import FavoriteArticleBtn from '../../Buttons/FavoriteArticleBtn/FavoriteArticleBtn';
import ArticleIcon from '../../Articles/ArticleIcon/ArticleIcon';
import ArticleUsername from '../../Articles/ArticleUsername/ArticleUsername';
import ArticleDate from '../../Articles/ArticleDate/ArticleDate';
import NotFound from '../NotFound/NotFound';
import CommentForm from '../../Forms/CommentForm/CommentForm';
import CommentList from '../../Comments/CommentList/CommentList';

import './Article.scss';
import FollowUserBtn from '../../Buttons/FollowUserBtn/FollowUserBtn';
import { getToken } from '../../../utils/common/common';
import { getUrl, URLS } from '../../../utils/urls/urls';
import { IOptions } from '../../../utils/types/types';

interface IProfile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

const Article: FC = () => {
  // states from store
  const { articles, buttonFetchMode, formFetchMode } = useTypedSelector((state) => state.article);
  const { user } = useTypedSelector((state) => state.user);

  // article state
  const [article, setArticle] = useState<IArticle>();

  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  // get route params
  const params = useParams();

  const [profile, setProfile] = useState<IProfile | null>(null);

  const clickHandler = () => {
    if (profile?.following === false) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${getToken()}` as string,
        },
      };
      const url = getUrl(URLS.GET_USER) + `/${article?.author.username}` + '/follow';
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => setProfile(data.profile));
    } else {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${getToken()}` as string,
        },
      };
      const url = getUrl(URLS.GET_USER) + `/${article?.author.username}` + '/follow';
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => setProfile(data.profile));
    }
  };

  // set button fetch mode (NO_FETCH) if has been activated (FETCHED) and reload articles
  useEffect(() => {
    if (buttonFetchMode === FETCH_MODE.FETCHED) {
      dispatch(setButtonFetchMode(FETCH_MODE.NO_FETCH));
      dispatch(getGlobalArticles());
    }
  }, [buttonFetchMode]);

  // set form fetch mode (NO_FETCH) if has been activated (FETCHED) and reload articles
  useEffect(() => {
    if (formFetchMode === FETCH_MODE.FETCHED) {
      dispatch(setFormFetchMode(FETCH_MODE.NO_FETCH));
      dispatch(getGlobalArticles());
    }
  }, [formFetchMode]);

  // set form fetch mode (NO_FETCH) if has been activated (FETCHED) and reload articles
  // double mode activated if article has been deleted
  useEffect(() => {
    if (buttonFetchMode === FETCH_MODE.FETCHED && formFetchMode === FETCH_MODE.FETCHING) {
      dispatch(setFormFetchMode(FETCH_MODE.NO_FETCH));
      dispatch(setButtonFetchMode(FETCH_MODE.NO_FETCH));
      dispatch(getGlobalArticles());
    }
  }, [formFetchMode, buttonFetchMode]);

  // find needable article and save to state or redirect to home page
  useEffect(() => {
    if (articles) {
      let flag = false;

      articles.map((elem: IArticle) => {
        if (elem.title.trim().toLowerCase() === params.title!.trim().toLowerCase()) {
          setArticle(elem);
          flag = true;
        }
      });

      flag ? false : navigate('/');
    }
  }, [articles]);

  useEffect(() => {
    const token = getToken();
    const options: IOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    if (token) options.headers.Authorization = `Token ${token}`;
    fetch(getUrl(URLS.GET_USER) + `/${article?.author.username}`, options)
      .then((response) => response.json())
      .then((data) => setProfile(data.profile));
  }, [article?.author.username]);

  // return this if article page has bee reloaded
  if (!article)
    return (
      <>
        <NotFound />
      </>
    );
  return (
    <>
      <div className="Article">
        {/* banner start */}
        <div className="Article-top">
          <Container>
            <div className="Article-top__row">
              <h1 className="Article-top__title">{article && article.title}</h1>
              <div className="Article-top__panel">
                {/* user block */}
                <div className="Article-top__userBlock">
                  <ArticleIcon username={article && article.author.username} />
                  <div className="Article-top__props">
                    <ArticleUsername
                      username={article && article.author.username}
                      color={'white'}
                    />
                    <div className="Article-top__props_date">
                      {article && <ArticleDate date={article.createdAt} />}
                    </div>
                  </div>
                </div>

                {/* show/hide buttons: edit/delete article or favorite/folow user */}
                {article && user?.username === article.author.username ? (
                  <>
                    <EditArticleBtn article={article} />
                    <DeleteArticleBtn slug={article && article.slug} />
                  </>
                ) : (
                  <>
                    <FollowUserBtn
                      username={article && article.author.username}
                      click={() => clickHandler()}
                      following={profile?.following}
                    />
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
        {/* banner end */}

        {/* article cintent start */}
        <Container>
          <div className="Article-content">
            <div className="Article-content__body">{article && article.body}</div>
            <div className="Article-content__tag-list">
              {article &&
                article.tagList.map((elem: string, i: number) => (
                  <ArticlePageTag key={i} tag={elem} />
                ))}
            </div>
            <hr className="Article-content__line" />
            <div className="Article-content__panel">
              <div className="Article-content__userBlock">
                <ArticleIcon username={article && article.author.username} />
                <div className="Article-content__props">
                  <ArticleUsername username={article && article.author.username} />
                  <div className="Article-content__props_date">
                    {article && <ArticleDate date={article.createdAt} />}
                  </div>
                </div>
              </div>

              {/* show/hide buttons: edit/delete article or favorite/folow user */}
              {article && user?.username === article.author.username ? (
                <>
                  <EditArticleBtn article={article} />
                  <DeleteArticleBtn slug={article && article.slug} />
                </>
              ) : (
                <>
                  <FollowUserBtn
                    username={article && article.author.username}
                    click={() => clickHandler()}
                    following={profile?.following}
                  />
                  <FavoriteArticleBtn
                    article={article && article}
                    mode={FAVORITE_BTN_MODE.ARTICLE_MODE}
                  />
                </>
              )}
            </div>
          </div>
        </Container>
        {/* article cintent end */}

        {/* cooments block */}
        <Container>
          <div className="Article-bottom">
            <CommentForm slug={article.slug} />
            <CommentList slug={article.slug} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Article;
