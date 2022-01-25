import React, { FC, useState } from 'react';
import Container from '../../Container/Container';
import { useTypedSelector } from '../../../store/selectors';
import { NavLink } from 'react-router-dom';
import ArticleList from '../../ArticleList/ArticleList';
import PopularTag from '../../Tags/PopularTag/PopularTag';
import './Homepage.scss';

const Homepage: FC = () => {
  const { user } = useTypedSelector((state) => state.user);

  const [active, setActive] = useState<string>('global');

  return (
    <div className="Homepage">
      {user ? null : (
        <div className="Homepage-banner">
          <h1 className="Homepage-banner__title">conduit</h1>
          <p className="Homepage-banner__text">
            A place to share your <span className="Homepage-banner__text_italic">React</span>
            knowledge.
          </p>
        </div>
      )}
      <Container>
        <div className="Homepage-row">
          <div className="Homepage-content">
            <nav className="Homepage-content__navbar">
              <NavLink
                className={
                  active === 'user'
                    ? 'Homepage-content__navbar_link-active'
                    : 'Homepage-content__navbar_link'
                }
                to={'/'}
                onClick={() => setActive('user')}
              >
                Your Feed
              </NavLink>
              <NavLink
                className={
                  active === 'global'
                    ? 'Homepage-content__navbar_link-active'
                    : 'Homepage-content__navbar_link'
                }
                to={'/'}
                onClick={() => setActive('global')}
              >
                Global Feed
              </NavLink>
            </nav>
            <ArticleList category={active} />
          </div>

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
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
