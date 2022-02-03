import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../../../utils/urls/urls';
import './ArticleIcon.scss';

interface IArticleIconProps {
  username: string | undefined;
  size?: string | undefined;
}

const ArticleIcon: FC<IArticleIconProps> = ({ username, size }) => {
  const navigate = useNavigate();

  return (
    <img
      src={URLS.DEFAULT_LOGO}
      className={`ArticleIcon ${size}`}
      onClick={() => navigate(`/profile/${username}`)}
    />
  );
};

export default ArticleIcon;
