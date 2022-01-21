import React, {FC} from 'react';
import Container from "../../Container/Container";
import {Link} from "react-router-dom";
import './Register.css'

const Register: FC = () => {
    return (
        <div className={'register'}>
            <Container>
                <div className={'register__body'}>
                    <h2 className={'register__header'}>Sign up</h2>
                    <Link className={'register__login-link'} to={"/login"}>Have an account?</Link>
                    <form className={'register__form'} action="">
                        <input className={'register__input'} type="text" placeholder={'Username'}/>
                        <input className={'register__input'} type="email" placeholder={'Email'}/>
                        <input className={'register__input'} type="password" placeholder={'Password'}/>
                        <button className={'register__submit'} type={"submit"}>Sign up</button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Register;