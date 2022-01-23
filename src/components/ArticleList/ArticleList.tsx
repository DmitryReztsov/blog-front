import React, { FC } from 'react';

interface IArticleListProps {
  category: string;
}

const ArticleList: FC<IArticleListProps> = ({ category }) => {
  return <div>{category === 'user' ? <p> Wow! Access granted!</p> : <p>all news</p>}</div>;
};

export default ArticleList;
