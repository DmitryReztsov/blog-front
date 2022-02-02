import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFeedArticles, getGlobalArticles } from '../../../store/article/actions';
import { ARTICLE_LIST_MODE, IArticle } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleList.scss';

interface IArticleListProps {
  mode: ARTICLE_LIST_MODE;
  tag?: string;
}

const ArticleList: FC<IArticleListProps> = ({ mode, tag }) => {
  const { user } = useTypedSelector((state) => state.user);
  const { articles, feedArticles } = useTypedSelector((state) => state.article);
  const [currentArticles, setCurrentArticles] = useState<IArticle[] | null>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (mode === ARTICLE_LIST_MODE.FEED_MODE) {
      user ? dispatch(getFeedArticles()) : navigate('/login');
    }
    if (mode === ARTICLE_LIST_MODE.GLOBAL_MODE) {
      dispatch(getGlobalArticles());
    }
    if (mode === ARTICLE_LIST_MODE.TAG_MODE) {
      dispatch(getGlobalArticles());
    }
  }, []);

  const showArticles = (): any => {
    return currentArticles?.map((el: any, i: any) => {
      return <ArticleCard key={i} articleData={el} />;
    });
  };

  useEffect(() => {
    if (feedArticles && mode === ARTICLE_LIST_MODE.FEED_MODE) {
      setCurrentArticles(feedArticles);
    }
  }, [feedArticles]);

  useEffect(() => {
    if (articles && mode === ARTICLE_LIST_MODE.GLOBAL_MODE) {
      setCurrentArticles(articles);
    }
  }, [articles]);

  useEffect(() => {
    if (tag && mode === ARTICLE_LIST_MODE.TAG_MODE) {
      const filtredArticles = articles.filter((el: any) => el.tagList.includes(tag));
      setCurrentArticles(filtredArticles);
    }
  }, [tag]);

  if (!currentArticles)
    return (
      <div className="ArticleList">
        <p className="ArticleList-text">Loading...</p>
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
