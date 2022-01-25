import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import './Footer.scss';

const Footer: FC = () => {
  return (
    <footer className="Footer">
      <Container>
        <div className="Footer-content">
          <NavLink to={'/'} className="Footer-logo">
            conduit
          </NavLink>
          <p className="Footer-text">
            © 2022. An interactive learning project from <span>Thinkster</span>. Code licensed under
            MIT.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
