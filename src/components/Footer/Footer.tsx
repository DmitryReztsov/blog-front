import React, { FC } from 'react';
import Container from '../Container/Container';
import './Footer.css';
import { NavLink } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className={'footer'}>
      <Container>
        <div className={'footer__body'}>
          <NavLink to={'/'} className={'footer__logo'}>
            conduit
          </NavLink>
          <p className={'footer__text'}>
            © 2022. An interactive learning project from Thinkster. Code licensed under MIT.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
