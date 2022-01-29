import React, { FC } from 'react';
import Container from '../../Container/Container';
import { useTypedSelector } from '../../../store/selectors';
import { URLS } from '../../../utils/urls/urls';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.scss';

const Profile: FC = () => {
  const { user } = useTypedSelector((state) => state.user);
  const { username } = useParams();
  const navigate = useNavigate();

  const clickHandler = () => {
    if (username === user?.username) {
      navigate('/settings');
    }
  };

  return (
    <div className={'Profile'}>
      <div className={'Profile-header'}>
        <Container>
          <div className={'Profile-header__body'}>
            <div className={'Profile-header__logo'}>
              <img
                src={user ? user.image : URLS.DEFAULT_LOGO}
                alt="profile-image"
                className="Profile-header__img"
              />
            </div>
            <div className={'Profile-header__username'}>Username</div>
            <div className={'Profile-header__bio'}>Bio</div>
            <button
              className={'Profile-header__button submit submit_very-small submit_settings'}
              onClick={() => clickHandler()}
            >
              {username === user?.username ? 'Edit profile settings' : 'Follow'}
            </button>
          </div>
        </Container>
      </div>
      <Container>Здесь должен быть профиль username</Container>
    </div>
  );
};

export default Profile;
