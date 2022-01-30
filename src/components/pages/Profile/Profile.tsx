import React, { FC } from 'react';
import Container from '../../Container/Container';
import { useTypedSelector } from '../../../store/selectors';

const Profile: FC = () => {
  const { user } = useTypedSelector((state) => state.user);
  return (
    <div>
      <Container>{user ? `Здесь должен быть профиль ${user.username}` : null}</Container>
    </div>
  );
};

export default Profile;
