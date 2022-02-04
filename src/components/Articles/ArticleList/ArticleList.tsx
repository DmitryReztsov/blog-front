import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getFeedArticles,
  getGlobalArticles,
  getUserArticles,
} from '../../../store/article/actions';
import { ARTICLE_LIST_MODE, IArticle } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleList.scss';

interface IArticleListProps {
  mode: ARTICLE_LIST_MODE;
  tag?: string;
  username?: string;
}

const ArticleList: FC<IArticleListProps> = ({ mode, tag, username }) => {
  const { user } = useTypedSelector((state) => state.user);
  const { articles, feedArticles } = useTypedSelector((state) => state.article);
  const [currentArticles, setCurrentArticles] = useState<IArticle[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE) {
      user ? dispatch(getFeedArticles()) : navigate('/login');
    }
    if (mode === ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE) {
      dispatch(getGlobalArticles());
    }
    if (mode === ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE) {
      dispatch(getGlobalArticles());
    }
    if (mode === ARTICLE_LIST_MODE.PROFILE_MY_POSTS) {
      dispatch(getUserArticles(username!));
    }
    if (mode === ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS) {
      dispatch(getGlobalArticles());
    }
  }, []);

  const showArticles = (): any => {
    return currentArticles?.map((elem: any, i: number) => {
      return <ArticleCard key={i} articleData={elem} />;
    });
  };

  useEffect(() => {
    if (feedArticles && mode === ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE) {
      setCurrentArticles(feedArticles);
    }
  }, [feedArticles]);

  useEffect(() => {
    if (
      (articles && mode === ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE) ||
      (articles && mode === ARTICLE_LIST_MODE.PROFILE_MY_POSTS)
    ) {
      setCurrentArticles(articles);
    }
  }, [articles]);

  useEffect(() => {
    if (tag && mode === ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE) {
      const filtredArticles = articles!.filter((elem: any) => elem.tagList.includes(tag));
      setCurrentArticles(filtredArticles);
    }
  }, [tag]);

  useEffect(() => {
    if (user && mode === ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS) {
      const filtredArticles = articles!.filter((elem: IArticle) => elem.favorited);
      setCurrentArticles(filtredArticles);
    }
  }, [mode, articles]);

  if (!currentArticles)
    return (
      <div className="ArticleList">
        <p className="ArticleList-text">Loading Articles...</p>
      </div>
    );

  return (
    <>
      {currentArticles && currentArticles.length > 0 ? (
        <div className="ArticleList">{showArticles()}</div>
      ) : (
        <p className="ArticleList-text">No articles are here... yet.</p>
      )}
    </>
  );
};

export default ArticleList;
