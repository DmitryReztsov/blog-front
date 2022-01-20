import React, {FC} from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Layout.css'

const Layout: FC = () => {
    return (
        <div className={'layout'}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;