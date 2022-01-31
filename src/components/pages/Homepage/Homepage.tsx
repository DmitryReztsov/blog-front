import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { getGlobalArticles } from '../../../store/article/actions';
import { ARTICLE_LIST_MODE, IArticle } from '../../../store/article/types';

import Container from '../../Container/Container';
import ArticleList from '../../Articles/ArticleList/ArticleList';
import PopularTag from '../../Tags/PopularTag/PopularTag';
import './Homepage.scss';

const Homepage: FC = () => {
  const [articleMode, setArticleMode] = useState<ARTICLE_LIST_MODE>(ARTICLE_LIST_MODE.GLOBAL_MODE);

  const { user } = useTypedSelector((state) => state.user);

  return (
    <div className="Homepage">
      {!user ? (
        <div className="Homepage-banner">
          <h1 className="Homepage-banner__title">conduit</h1>
          <p className="Homepage-banner__text">
            A place to share your <span className="Homepage-banner__text_italic">React</span>
            knowledge.
          </p>
        </div>
      ) : (
        <Container>
          <div className="Homepage-row">
            <div className="Homepage-content">
              {/* Lists of articles start */}
              <nav className="Homepage-content__navbar">
                <NavLink
                  className={
                    articleMode === ARTICLE_LIST_MODE.USER_MODE
                      ? 'Homepage-content__navbar_link-active'
                      : 'Homepage-content__navbar_link'
                  }
                  to={'/'}
                  onClick={() => setArticleMode(ARTICLE_LIST_MODE.USER_MODE)}
                >
                  Your Feed
                </NavLink>
                <NavLink
                  className={
                    articleMode === ARTICLE_LIST_MODE.GLOBAL_MODE
                      ? 'Homepage-content__navbar_link-active'
                      : 'Homepage-content__navbar_link'
                  }
                  to={'/'}
                  onClick={() => setArticleMode(ARTICLE_LIST_MODE.GLOBAL_MODE)}
                >
                  Global Feed
                </NavLink>
              </nav>

              {articleMode === ARTICLE_LIST_MODE.USER_MODE && <ArticleList mode={articleMode} />}

              {articleMode === ARTICLE_LIST_MODE.GLOBAL_MODE && <ArticleList mode={articleMode} />}
              {/* Lists of articles end */}
            </div>

            {/* Lists of popular tags start */}
            <div className="Homepage-sidebar">
              <div className="Homepage-sidebar__block">
                <div className="Homepage-sidebar__logo">Popular Tags</div>
                <div className="Homepage-sidebar__tagList">
                  <PopularTag tag={'welocme'} />
                  <PopularTag tag={'implementations'} />
                  <PopularTag tag={'codebaseShow'} />
                  <PopularTag tag={'introduction'} />
                </div>
              </div>
            </div>
            {/* Lists of popular tags end */}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Homepage;
