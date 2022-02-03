import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArticleUsername.scss';

interface IArticleUsernameProps {
  username: string | undefined;
  color?: string | undefined;
  size?: string | undefined;
}

const ArticleUsername: FC<IArticleUsernameProps> = ({ username, color, size }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`ArticleUsername ${color} ${size}`}
      onClick={() => navigate(`/profile/${username}`)}
    >
      {username}
    </div>
  );
};

export default ArticleUsername;
