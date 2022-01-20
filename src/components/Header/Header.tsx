import React, {FC} from 'react';
import {Link} from "react-router-dom";

const Header: FC = () => {
    return (
        <div>
            <h1>Yeah</h1>
            <nav>
                <Link to={"/"}>Home</Link>
            </nav>
        </div>
    );
};

export default Header;