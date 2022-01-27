import React, { FC, useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import './Settings.scss';

const Settings: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [url, setUrl] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const urlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.currentTarget.value);
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
              name={'url'}
              type="text"
              placeholder={'URL of profile picture'}
              value={url}
              onChange={urlChangeHandler}
            />
            <input
              className={'Settings-form__input form__input input'}
              name={'username'}
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
          </form>
        </div>
        <button style={{ padding: 10 }} onClick={clickHandler}>
          Разлогиниться
        </button>
      </Container>
    </div>
  );
};

export default Settings;
