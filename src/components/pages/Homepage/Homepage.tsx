import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { ARTICLE_LIST_MODE } from '../../../store/article/types';

import Container from '../../Container/Container';
import ArticleList from '../../Articles/ArticleList/ArticleList';
import PopularTag from '../../Tags/PopularTag/PopularTag';
import './Homepage.scss';
import { getTags } from '../../../store/article/actions';

const Homepage: FC = () => {
  const [articleMode, setArticleMode] = useState<ARTICLE_LIST_MODE>(
    ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE
  );
  const [tagList, setTagList] = useState<string[]>();
  const [tagName, setTagName] = useState<string | undefined>();
  const { user } = useTypedSelector((state) => state.user);
  const { tags } = useTypedSelector((state) => state.article);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, []);

  useEffect(() => {
    if (tags) {
      setTagList(tags);
    }
  }, [tags]);

  const getArticlesByTag = (tag: string, e?: React.MouseEventHandler<HTMLParagraphElement>) => {
    setTagName(tag);
    setArticleMode(ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE);
  };

  return (
    <div className="Homepage">
      {!user && (
        <div className="Homepage-banner">
          <Container>
            <h1 className="Homepage-banner__title">conduit</h1>
            <p className="Homepage-banner__text">
              A place to share your
              <span className="Homepage-banner__text_react">&nbsp;React&nbsp;</span>
              knowledge.
            </p>
          </Container>
        </div>
      )}
      <Container>
        <div className="Homepage-row">
          <div className="Homepage-content">
            {/* Lists of articles start */}
            <nav className="Homepage-content__navbar">
              <NavLink
                className={
                  articleMode === ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE
                    ? 'Homepage-content__navbar_link-active'
                    : 'Homepage-content__navbar_link'
                }
                to={'/'}
                onClick={() => setArticleMode(ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE)}
              >
                Your Feed
              </NavLink>
              <NavLink
                className={
                  articleMode === ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE
                    ? 'Homepage-content__navbar_link-active'
                    : 'Homepage-content__navbar_link'
                }
                to={'/'}
                onClick={() => setArticleMode(ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE)}
              >
                Global Feed
              </NavLink>
              <div
                className={
                  articleMode === ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE
                    ? 'Homepage-content__navbar_tagLink-active'
                    : 'Homepage-content__navbar_tagLink'
                }
              >
                <i _ngcontent-c0="" className="ion-pound">
                  &nbsp;
                </i>
                {tagName}
              </div>
            </nav>

            {articleMode === ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE && (
              <ArticleList mode={articleMode} />
            )}
            {articleMode === ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE && (
              <ArticleList mode={articleMode} />
            )}
            {articleMode === ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE && (
              <ArticleList mode={articleMode} tag={tagName} />
            )}
            {/* Lists of articles end */}
          </div>

          {/* Lists of popular tags start */}
          <div className="Homepage-sidebar">
            <div className="Homepage-sidebar__block">
              <div className="Homepage-sidebar__logo">Popular Tags</div>
              <div className="Homepage-sidebar__tagList">
                {tagList &&
                  tagList.map((el, i) => {
                    if (i > 10) return;
                    return <PopularTag tag={el} key={i} getArticlesByTag={getArticlesByTag} />;
                  })}
              </div>
            </div>
          </div>
          {/* Lists of popular tags end */}
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
