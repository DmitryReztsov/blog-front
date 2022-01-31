import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGlobalArticles, getUserArticles } from '../../../store/article/actions';
import { ARTICLE_LIST_MODE, IArticle } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleList.scss';

interface IArticleListProps {
  mode: ARTICLE_LIST_MODE;
}

const ArticleList: FC<IArticleListProps> = ({ mode }) => {
  const { user } = useTypedSelector((state) => state.user);
  const { articles } = useTypedSelector((state) => state.article);

  const dispatch = useDispatch();
  useEffect(() => {
    if (mode === ARTICLE_LIST_MODE.GLOBAL_MODE) {
      dispatch(getGlobalArticles());
    }
    if (mode === ARTICLE_LIST_MODE.USER_MODE) {
      dispatch(getUserArticles(user!.username));
    }
  }, []);

  const showArticles = (): any => {
    return articles?.map((el: any, i: any) => {
      return <ArticleCard key={i} articleData={el} />;
    });
  };
  if (!articles)
    return (
      <div className="ArticleList">
        <p className="ArticleList-text">Loading...</p>
      </div>
    );

  return (
    <>
      {articles.length > 0 ? (
        <div className="ArticleList">{showArticles()}</div>
      ) : (
        <p className="ArticleList-text">No articles are here... yet.</p>
      )}
    </>
  );
};

export default ArticleList;
