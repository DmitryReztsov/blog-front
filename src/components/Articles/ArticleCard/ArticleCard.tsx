import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from '../../../utils/common/common';

import CardTag from '../../Tags/CardTag/CardTag';

import './ArticleCard.scss';

interface IArticleProps {
  articleData: {
    author: any;
    createdAt: any;
    favoritesCount: number;
    title: string;
    description: string;
    tagList: string[] | [];
  };
}

const ArticleCard: FC<IArticleProps> = ({ articleData }) => {
  const navigate = useNavigate();

  const linkToArticle = (e: React.MouseEvent) => {
    navigate(`article/${articleData.title}`);
  };

  if (!articleData) return <></>;

  return (
    <div className="ArticleCard">
      <div className="ArticleCard-top">
        <div className="ArticleCard-top__userBlock">
          <img
            className="ArticleCard-top__icon"
            src="https://api.realworld.io/images/demo-avatar.png"
          />
          <div className="ArticleCard-top__props">
            <div className="ArticleCard-top__props_userName">{articleData.author.username}</div>
            <div className="ArticleCard-top__props_date">{dateFormat(articleData.createdAt)}</div>
          </div>
        </div>
        <button className="ArticleCard-top__favorites">
          <i className="ion-heart">&nbsp;</i>
          {articleData.favoritesCount}
        </button>
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

export default ArticleCard;
