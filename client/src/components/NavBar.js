import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const NavBar = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = (eo) => {
        eo.preventDefault();
        auth.logout();
        navigate('/');
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-2" style={{padding: '0 2rem'}}>
                <span className='brand-logo'>Shorten the link</span>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li><Link to='/create'>Create</Link></li>
                    <li><Link to='/links'>Links</Link></li>
                    <li><a href='/' onClick={logoutHandler}>Log out</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
