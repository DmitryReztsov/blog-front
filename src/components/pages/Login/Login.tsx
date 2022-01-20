import React, {FC} from 'react';
import Container from "../../Container/Container";
import {Link} from "react-router-dom";

const Login: FC = () => {
    return (
        <div className={'login'}>
            <Container>
                <h2 className={'login__header'}>Sign in</h2>
                <Link to={"/register"}>Need an account?</Link>

            </Container>
        </div>
    );
};

export default Login;