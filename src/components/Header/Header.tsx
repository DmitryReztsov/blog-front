import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import './Header.css';
import Container from "../Container/Container";

const Header: FC = () => {
    return (
        <header className="header">
            <Container>
                <div className="header__body">
                    <NavLink to={"/"} className={"header__logo"}>conduit</NavLink>
                    <nav className="nav">
                        <NavLink to={"/"} className={({isActive}) => isActive ? 'active-link': 'header__link'}>
                            Home
                        </NavLink>
                        <NavLink to={"/login"} className={({isActive}) => isActive ? 'active-link': 'header__link'}>
                            Sign in
                        </NavLink>
                        <NavLink to={"/register"} className={({isActive}) => isActive ? 'active-link': 'header__link'}>
                            Sign up
                        </NavLink>
                        <NavLink to={"/editor"} className={({isActive}) => isActive ? 'active-link': 'header__link'}>
                            New article
                        </NavLink>
                        <NavLink to={"/settings"} className={({isActive}) => isActive ? 'active-link': 'header__link'}>
                            Settings
                        </NavLink>
                        <NavLink to={"/profile"} className={({isActive}) => isActive ? 'active-link': 'header__link'}>
                            Profile
                        </NavLink>
                    </nav>
                </div>
            </Container>
        </header>
    );
};

export default Header;