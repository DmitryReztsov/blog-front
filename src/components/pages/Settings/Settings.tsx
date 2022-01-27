import React, { FC, useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { useDispatch } from 'react-redux';
import { clearUser, updateUser } from '../../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import './Settings.scss';
import { useTypedSelector } from '../../../store/selectors';

const Settings: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useTypedSelector((state) => state.user);
  const [image, setImage] = useState<string | undefined>(user?.image);
  const [username, setUsername] = useState<string | undefined>(user?.username);
  const [bio, setBio] = useState<string | undefined>(user?.bio);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [password, setPassword] = useState<string | undefined>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateUser(image, username, bio, email, password));
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setImage(e.currentTarget.value);
  };

  const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const bioChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setBio(e.currentTarget.value);
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const getClassname = (disabled: boolean): string => {
    return disabled
      ? 'Settings-form__submit form__submit submit submit_disabled'
      : 'Settings-form__submit form__submit submit';
  };

  useEffect(() => {
    if (username && email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, email, password]);

  const clickHandler = (): void => {
    dispatch(clearUser());
    navigate('/', { replace: true });
  };

  return (
    <div>
      <Container>
        <div className={'Settings-body'}>
          <h2 className={'Settings-header'}>Your Settings</h2>
          <form className={'Settings-form form'} onSubmit={submitHandler}>
            <input
              className={'Settings-form__input form__input input input_small'}
              name={'image'}
              type="text"
              placeholder={'URL of profile picture'}
              value={image}
              onChange={imageChangeHandler}
            />
            <input
              className={'Settings-form__input form__input input'}
              type="text"
              placeholder={'Username'}
              value={username}
              onChange={usernameChangeHandler}
            />
            <textarea
              className={'Settings-form__textarea form__textarea textarea'}
              name={'text'}
              placeholder={'Short bio about you'}
              value={bio}
              onChange={bioChangeHandler}
            />
            <input
              className={'Settings-form__input form__input input'}
              name={'description'}
              type="email"
              placeholder={'Email'}
              value={email}
              onChange={emailChangeHandler}
            />
            <input
              className={'Settings-form__input form__input input'}
              name={'password'}
              type="password"
              placeholder={'New Password'}
              value={password}
              onChange={passwordChangeHandler}
            />
            <button className={getClassname(disabled)} type={'submit'} disabled={disabled}>
              Update Settings
            </button>
            <hr className={'Settings-form__line'} />
            <button
              onClick={clickHandler}
              className={'Settings-form__logout form__logout submit submit_small submit_logout'}
            >
              Or click here to logout.
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Settings;
