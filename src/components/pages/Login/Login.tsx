import React, { FC, useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/user/actions';
import { useTypedSelector } from '../../../store/selectors';
import { Type } from 'typescript';

interface CustomizedState {
  from: string;
}

const Login: FC = () => {
  const dispatch = useDispatch();

  // обработка редиректа на прошлую страницу или главную
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CustomizedState;
  const from = state?.from || '/';

  const { user, error } = useTypedSelector((state) => state.user);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(setUser(email, password));
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const getClassname = (disabled: boolean): string => {
    return disabled ? 'login__submit login__submit_disabled' : 'login__submit';
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <div className={'login'}>
      <Container>
        <div className={'login__body'}>
          <h2 className={'login__header'}>Sign in</h2>
          <Link className={'login__register-link'} to={'/register'}>
            Need an account?
          </Link>
          {error ? (
            <ul>
              {error.text.map((text) => {
                return (
                  <li key={Math.random()} className={'login__error'}>
                    {text}
                  </li>
                );
              })}
            </ul>
          ) : null}
          <form className={'login__form'} onSubmit={submitHandler}>
            <input
              className={'login__input'}
              name={'email'}
              type="email"
              placeholder={'Email'}
              value={email}
              onChange={emailChangeHandler}
            />
            <input
              className={'login__input'}
              name={'password'}
              type="password"
              placeholder={'Password'}
              value={password}
              onChange={passwordChangeHandler}
            />
            <button className={getClassname(disabled)} type={'submit'} disabled={disabled}>
              Sign in
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
