import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import './Header.css';
import Container from "../Container/Container";
import {useTypedSelector} from "../../store/selectors";
import {URLS} from "../../utils/urls/urls";

const Header: FC = () => {
    const {user} = useTypedSelector(state => state.user)
    return (
        <header className="header">
            <Container>
                <div className="header__body">
                    <NavLink to={"/"} className={"header__logo"}>conduit</NavLink>
                    <nav className="header__nav">
                        <NavLink to={"/"} className={({isActive}) => isActive ? 'active-link' : 'header__link'}>
                            Home
                        </NavLink>
                        {user ?
                            <>
                                <NavLink to={"/editor"}
                                         className={({isActive}) => isActive ? 'active-link' : 'header__link'}>
                                    New article
                                </NavLink>
                                <NavLink to={"/settings"}
                                         className={({isActive}) => isActive ? 'active-link' : 'header__link'}>
                                    Settings
                                </NavLink>
                                <img src={user.image || URLS.DEFAULT_LOGO} alt="user-image" className={'user-image header_user-image'}/>
                                <NavLink to={`/profile/${user.username}`}
                                         className={({isActive}) => isActive ? 'active-link' : 'header__link'}>
                                    {user.username}
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink to={"/login"}
                                         className={({isActive}) => isActive ? 'active-link' : 'header__link'}>
                                    Sign in
                                </NavLink>
                                <NavLink to={"/register"}
                                         className={({isActive}) => isActive ? 'active-link' : 'header__link'}>
                                    Sign up
                                </NavLink>
                            </>
                        }
                    </nav>
                </div>
            </Container>
        </header>
    );
};

export default Header;