import React, { useState, useEffect, useContext } from 'react'

import { SessionContext } from '../SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


function Header() {
    const sessionInfo = useContext(SessionContext);

    const logout = async () => {
        try {
            await fetch("/api/user/logout");
            window.location.href = "/";
        }
        catch (err) {
            console.log(err);
        }
    }


    if (sessionInfo.logged === 1) {
        return (
            <div className="header-container">
                <div className="show-food-container">
                    <a href="/">I'm... Hungry...</a>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="/cart"><FontAwesomeIcon icon={faShoppingCart} /></a></li>
                        <li><a href="/profile"><FontAwesomeIcon icon={faUser} /></a></li>
                        <li><a onClick={() => logout()} href="#"><FontAwesomeIcon icon={faSignInAlt} /></a></li>
                    </ul>
                </nav>
            </div>
        )
    }
    if (sessionInfo.logged === 0) {
        return (
            <div className="header-container">
                <div className="show-food-container">
                    <a href="/">I'm... Hungry...</a>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="/cart"><FontAwesomeIcon icon={faShoppingCart} /></a></li>
                        <li><a href="/login"><FontAwesomeIcon icon={faSignOutAlt} /></a></li>
                    </ul>
                </nav>
            </div>
        )
    }

    return (
        <div className="header-container">
            <div className="show-food-container">
                <a href="/">I'm... Hungry...</a>
            </div>
            <nav className="navigation">
                <ul>

                </ul>
            </nav>
        </div>
    );



}

export default Header
