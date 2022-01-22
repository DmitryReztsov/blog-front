import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './Main.css';

const Main: FC = () => {
  return (
    <main className={'main'}>
      <Outlet />
    </main>
  );
};

export default Main;
