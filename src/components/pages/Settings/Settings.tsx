import React, { FC } from 'react';
import Container from '../../Container/Container';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../store/user/actions';
import { useNavigate } from 'react-router-dom';

const Settings: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (): void => {
    dispatch(clearUser());
    navigate('/', { replace: true });
  };
  return (
    <div>
      <Container>
        Здесь должны быть настройки
        <button style={{ padding: 10 }} onClick={clickHandler}>
          Разлогиниться
        </button>
      </Container>
    </div>
  );
};

export default Settings;
