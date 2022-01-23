import React, { FC, useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { registerUser } from '../../../store/user/actions';

const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useTypedSelector((state) => state.user);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(registerUser(username, email, password));
  };

  const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const getClassname = (disabled: boolean): string => {
    return disabled ? 'register__submit register__submit_disabled' : 'register__submit';
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (username && email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, email, password]);

  return (
    <div className={'register'}>
      <Container>
        <div className={'register__body'}>
          <h2 className={'register__header'}>Sign up</h2>
          <Link className={'register__login-link'} to={'/login'}>
            Have an account?
          </Link>
          {error ? (
            <ul>
              {error.text.map((text) => {
                return (
                  <li key={Math.random()} className={'register__error'}>
                    {text}
                  </li>
                );
              })}
            </ul>
          ) : null}
          <form className={'register__form'} onSubmit={submitHandler}>
            <input
              className={'register__input'}
              name={'username'}
              type="text"
              placeholder={'Username'}
              value={username}
              onChange={usernameChangeHandler}
            />
            <input
              className={'register__input'}
              name={'email'}
              type="email"
              placeholder={'Email'}
              value={email}
              onChange={emailChangeHandler}
            />
            <input
              className={'register__input'}
              name={'password'}
              type="password"
              placeholder={'Password'}
              value={password}
              onChange={passwordChangeHandler}
            />
            <button className={getClassname(disabled)} type={'submit'} disabled={disabled}>
              Sign up
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Register;
