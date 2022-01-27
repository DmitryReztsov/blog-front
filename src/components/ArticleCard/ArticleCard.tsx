import React, { FC } from 'react';
import CardTag from '../Tags/CardTag/CardTag';
import './ArticleCard.scss';

interface IArticleProps {
  articleInfo: {
    user: string;
    date: string;
    likes: number;
    articleName: string;
    articlePreview: string;
    tags: string[];
  };
}

const ArticleCard: FC<IArticleProps> = ({ articleInfo }) => {
  return (
    <div className="ArticleCard">
      <div className="ArticleCard-top">
        <div className="ArticleCard-top__userBlock">
          <img
            className="ArticleCard-top__icon"
            src="https://api.realworld.io/images/demo-avatar.png"
          />
          <div className="ArticleCard-top__props">
            <div className="ArticleCard-top__props_userName">{articleInfo.user}</div>
            <div className="ArticleCard-top__props_date">{articleInfo.date}</div>
          </div>
        </div>
        <button className="ArticleCard-top__likes">
          <i className="ion-heart">&nbsp;</i>
          {articleInfo.likes}
        </button>
      </div>

      <h1 className="ArticleCard-artName">{articleInfo.articleName}</h1>
      <p className="ArticleCard-preview">{articleInfo.articlePreview}</p>
      <div className="ArticleCard-bottom">
        <div className="ArticleCard-bottom__read">Read more...</div>
        <div className="ArticleCard-bottom__tags">
          {articleInfo.tags.map((el, i) => (
            <CardTag key={i} tag={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
