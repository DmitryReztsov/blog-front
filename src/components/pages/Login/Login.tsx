import React, {FC} from 'react';
import Container from "../../Container/Container";
import {Link} from "react-router-dom";
import './Login.css'

const Login: FC = () => {
    return (
        <div className={'login'}>
            <Container>
                <div className={'login__body'}>
                    <h2 className={'login__header'}>Sign in</h2>
                    <Link className={'login__register-link'} to={"/register"}>Need an account?</Link>
                    <form className={'login__form'} action="">
                        <input className={'login__input'} name={'email'} type='email' placeholder={'Email'}/>
                        <input className={'login__input'} name={'password'} type='password' placeholder={'Password'}/>
                        <button className={'login__submit'} type={'submit'}>Sign in</button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Login;