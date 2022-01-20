import React, {FC} from 'react';
import {Link} from "react-router-dom";
import './Header.css';
import Container from "../Container/Container";

const Header: FC = () => {
    return (
        <header className="header">
            <Container>
                <div className="header__body">
                    <h1 className="logo">conduit</h1>
                    <nav className="nav">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/editor"}>New article</Link>
                        <Link to={"/settings"}>Settings</Link>
                        <Link to={"/profile"}>Profile</Link>
                    </nav>
                </div>
            </Container>
        </header>
    );
};

export default Header;