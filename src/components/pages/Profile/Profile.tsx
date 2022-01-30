import React, { FC, useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { useTypedSelector } from '../../../store/selectors';
import { getUrl, URLS } from '../../../utils/urls/urls';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.scss';

interface IProfile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

const Profile: FC = () => {
  const { user } = useTypedSelector((state) => state.user);
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<IProfile | null>(null);

  const clickHandler = () => {
    if (username === user?.username) {
      navigate('/settings');
    }
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    fetch(getUrl(URLS.GET_USER) + `/${username}`, options)
      .then((response) => response.json())
      .then((data) => setProfile(data.profile));
  }, []);

  return (
    <div className={'Profile'}>
      <div className={'Profile-header'}>
        <Container>
          <div className={'Profile-header__body'}>
            <div className={'Profile-header__logo'}>
              <img
                src={profile ? profile.image : URLS.DEFAULT_LOGO}
                alt="profile-image"
                className="Profile-header__img"
              />
            </div>
            <div className={'Profile-header__username'}>{profile?.username || null}</div>
            <div className={'Profile-header__bio'}>{profile?.bio || null}</div>
            <button
              className={'Profile-header__button submit submit_very-small submit_settings'}
              onClick={() => clickHandler()}
            >
              {username === user?.username ? 'Edit profile settings' : `Follow ${username}`}
            </button>
          </div>
        </Container>
      </div>
      <Container>Здесь должны быть посты {profile?.username}</Container>
    </div>
  );
};

export default Profile;
