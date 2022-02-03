import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setFetchMode } from '../../../../store/article/actions';
import { ARTICLE_LIST_MODE, FETCH_MODE } from '../../../../store/article/types';
import { useTypedSelector } from '../../../../store/selectors';
import ArticleList from '../../../Articles/ArticleList/ArticleList';
import './ProfileContent.scss';

interface IProfileContentProps {
  username: string | undefined;
}

const ProfileContentInner: FC<IProfileContentProps> = ({ username }) => {
  const { fetchMode } = useTypedSelector((state) => state.article.fetchMode);
  const dispatch = useDispatch();
  const [profileMode, setProfileMode] = useState<ARTICLE_LIST_MODE>(
    ARTICLE_LIST_MODE.PROFILE_MY_POSTS
  );

  return (
    <div className="ProfileContent">
      <div className="ProfileContent-content">
        <nav className="ProfileContent-navbar">
          <NavLink
            className={
              profileMode === ARTICLE_LIST_MODE.PROFILE_MY_POSTS
                ? 'ProfileContent-navbar__link-active'
                : 'ProfileContent-navbar__link'
            }
            to={`/profile/${username}`}
            onClick={() => setProfileMode(ARTICLE_LIST_MODE.PROFILE_MY_POSTS)}
          >
            My Posts
          </NavLink>
          <NavLink
            className={
              profileMode === ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS
                ? 'ProfileContent-navbar__link-active'
                : 'ProfileContent-navbar__link'
            }
            to={`/profile/${username}`}
            onClick={() => setProfileMode(ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS)}
          >
            Favorited Posts
          </NavLink>
        </nav>

        {profileMode === ARTICLE_LIST_MODE.PROFILE_MY_POSTS && (
          <ArticleList mode={profileMode} username={username} />
        )}
        {profileMode === ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS && (
          <ArticleList mode={profileMode} />
        )}
      </div>
    </div>
  );
};

export const ProfileContent = React.memo(ProfileContentInner);
