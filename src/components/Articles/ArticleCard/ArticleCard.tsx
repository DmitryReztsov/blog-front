import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAVORITE_BTN_MODE } from '../../../store/article/types';
import FavoriteArticleBtn from '../../Buttons/FavoriteArticleBtn/FavoriteArticleBtn';

import CardTag from '../../Tags/CardTag/CardTag';
import ArticleDate from '../ArticleDate/ArticleDate';
import ArticleIcon from '../ArticleIcon/ArticleIcon';
import ArticleUsername from '../ArticleUsername/ArticleUsername';

import './ArticleCard.scss';

interface IArticleProps {
  articleData: {
    author: any;
    createdAt: any;
    favoritesCount: number;
    title: string;
    description: string;
    body: string;
    tagList: string[] | [];
    slug: string;
    favorited: boolean;
  };
}

const ArticleCard: FC<IArticleProps> = ({ articleData }) => {
  const navigate = useNavigate();

  const linkToArticle = (e: React.MouseEvent) => {
    navigate(`/article/${articleData.title}`);
  };

  if (!articleData) return <></>;

  return (
    <div className="ArticleCard">
      <div className="ArticleCard-top">
        <div className="ArticleCard-top__userBlock">
          <ArticleIcon username={articleData.author.username} />
          <div className="ArticleCard-top__props">
            <ArticleUsername username={articleData.author.username} />
            <div className="ArticleCard-top__props_date">
              {<ArticleDate date={articleData.createdAt} />}
            </div>
          </div>
        </div>
        <FavoriteArticleBtn article={articleData} mode={FAVORITE_BTN_MODE.CARD_MODE} />
      </div>

      <h1 className="ArticleCard-title" onClick={linkToArticle}>
        {articleData.title}
      </h1>
      <p className="ArticleCard-description" onClick={linkToArticle}>
        {articleData.description}
      </p>
      <div className="ArticleCard-bottom">
        <div className="ArticleCard-bottom__read" onClick={linkToArticle}>
          Read more...
        </div>
        <div className="ArticleCard-bottom__tag-list" onClick={linkToArticle}>
          {articleData.tagList.map((el, i) => (
            <CardTag key={i} tag={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

const compareArticleData = (prevProps: any, nextProps: any) => {
  return prevProps === nextProps;
};

export default React.memo(ArticleCard);
