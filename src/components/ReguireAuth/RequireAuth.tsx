import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/common/common';

interface IRequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const token = getToken();

  // Отправляем пользователя на страницу логина если он не залогинен
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
