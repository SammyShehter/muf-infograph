import React from 'react';
import {Link} from "react-router-dom"

const Navbar = ({isAuthenticated, logout}) => {

    const authLinks = (
        <>
            <li>
                <a onClick={logout}>
                    Logout
                </a>
            </li>
        </>
    )

    const guestLinks = (
        <>
            <li>
                <Link to={"/login"}>Login</Link>
            </li>
            <li>
                <Link to={"/register"}>Register</Link>
            </li>
        </>
    )

    return (
        <nav>
            <div className="nav-wrapper">
                <ul className="right hide-on-med-and-down">
                    {!isAuthenticated ? guestLinks : authLinks}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
