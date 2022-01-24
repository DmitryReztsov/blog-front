import React, { FC, useState } from 'react';
import Container from '../../Container/Container';
import { useTypedSelector } from '../../../store/selectors';
import './Homepage.scss';
import { NavLink } from 'react-router-dom';
import ArticleList from '../../ArticleList/ArticleList';

const Homepage: FC = () => {
  const { user } = useTypedSelector((state) => state.user);

  const [active, setActive] = useState<string>('global');

  return (
    <div className={'Homepage'}>
      {user ? null : (
        <div className={'Homepage-banner'}>
          <h1 className={'Homepage-banner__title'}>conduit</h1>
          <p className={'Homepage-banner__text'}>
            A place to share your <span className={'Homepage-banner__text_italic'}>React</span>{' '}
            knowledge.
          </p>
        </div>
      )}
      <Container>
        <div className={'Homepage-body'}>
          <nav className={'Homepage-nav'}>
            <NavLink
              className={
                active === 'user'
                  ? 'Homepage-nav__link Homepage-nav__link_active'
                  : 'Homepage-nav__link'
              }
              to={'/'}
              onClick={() => setActive('user')}
            >
              Your Feed
            </NavLink>
            <NavLink
              className={
                active === 'global'
                  ? 'Homepage-nav__link Homepage-nav__link_active'
                  : 'Homepage-nav__link'
              }
              to={'/'}
              onClick={() => setActive('global')}
            >
              Global Feed
            </NavLink>
          </nav>
          <div className={'Homepage-body__list'}>
            <ArticleList category={active} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
