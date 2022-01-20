import React, {FC} from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: FC = () => {
    return (
        <>
            <h1>Yeah</h1>
            <nav>
                <Link to={"/"}>Home</Link>
            </nav>
            <Outlet/>
        </>

    );
};

export default Layout;