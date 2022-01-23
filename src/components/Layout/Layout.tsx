import React, { FC } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.css';
import Main from '../Main/Main';

const Layout: FC = () => {
  return (
    <div className={'layout'}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
