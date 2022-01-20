import React, {FC} from 'react';
import {Link} from "react-router-dom";
import './Header.css';

const Header: FC = () => {
    return (
        <div className="header">
            <h1>Conduit</h1>
            <nav className="nav">
                <Link to={"/"}>Home</Link>
                <Link to={"/editor"}>New article</Link>
                <Link to={"/settings"}>Settings</Link>
                <Link to={"/profile"}>Profile</Link>
            </nav>
        </div>
    );
};

export default Header;