import React, { FC } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleList.scss';

interface IArticleListProps {
  category: string;
}

const ArticleList: FC<IArticleListProps> = ({ category }) => {
  return (
    <div className="ArticleList">
      {category === 'user' ? (
        <p className="ArticleList-empty__text">No articles are here... yet.</p>
      ) : (
        // <p className="ArticleList-empty__text">all news</p>
        <ArticleCard
          articleInfo={{
            user: 'Gerome',
            date: 'November 24,2021',
            likes: 901,
            articleName: 'Create a new implementation',
            articlePreview: 'join the community by creating a new implementation',
            tags: ['implementations'],
          }}
        />
      )}
    </div>
  );
};

export default ArticleList;
