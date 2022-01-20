import React, {FC} from 'react';
import Container from "../../Container/Container";
import {Link} from "react-router-dom";
import './Login.css'

const Login: FC = () => {
    return (
        <main className={'login'}>
            <Container>
                <div className={'login__body'}>
                    <h2 className={'login__header'}>Sign in</h2>
                    <Link className={'login__register-link'} to={"/register"}>Need an account?</Link>
                    <form className={'login__form'} action="">
                        <input className={'login__input'} type="email"/>
                        <input className={'login__input'} type="password"/>
                        <button className={'login__submit'} type={"submit"}>Sign in</button>
                    </form>
                </div>
            </Container>
        </main>
    );
};

export default Login;