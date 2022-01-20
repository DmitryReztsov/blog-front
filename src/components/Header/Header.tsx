import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import './Header.css';
import Container from "../Container/Container";

const Header: FC = () => {
    return (
        <header className="header">
            <Container>
                <div className="header__body">
                    <h1 className="logo">conduit</h1>
                    <nav className="nav">
                        <NavLink to={"/"}>Home</NavLink>
                        <NavLink to={"/editor"}>New article</NavLink>
                        <NavLink to={"/settings"}>Settings</NavLink>
                        <NavLink to={"/profile"}>Profile</NavLink>
                    </nav>
                </div>
            </Container>
        </header>
    );
};

export default Header;