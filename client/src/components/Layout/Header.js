import React, { useState, useEffect, useContext } from 'react'

import { useSessionInfo } from "../../SessionContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


function Header({ cartCount }) {

    const sessionInfo = useSessionInfo();
    const [cart, setCart] = useState([])
    const [cartFetched, setCartFetched] = useState(false)

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
        if (sessionInfo.isAdmin === true) {
            return (
                <div className="header-container">
                    <div className="show-food-container">
                        <a href="/">I'm... Hungry...</a>
                    </div>
                    <nav className="navigation">
                        <ul>
                            <li className="admin-li"><a href="/admin"><FontAwesomeIcon className
                                ="admin-button" icon={faTools} /></a></li>
                            <li className="cart-li"><a href="/cart"><FontAwesomeIcon icon={faShoppingCart} />
                            </a>
                                <div className="cart-indicator">{cartCount}</div>
                            </li>
                            <li className="profile-li"><a href="/profile"><FontAwesomeIcon icon={faUser} /></a></li>
                            <li className="logout-li"><a onClick={() => logout()} href="#"><FontAwesomeIcon icon={faSignOutAlt} /></a></li>
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
                        <li className="cart-li"><a href="/cart"><FontAwesomeIcon icon={faShoppingCart} /></a>
                            <div className="cart-indicator">{cartCount}</div>
                        </li>
                        <li className="profile-li"><a href="/profile"><FontAwesomeIcon icon={faUser} /></a></li>
                        <li className="logout-li"><a onClick={() => logout()} href="#"><FontAwesomeIcon icon={faSignOutAlt} /></a></li>
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
                        <li className="cart-li"><a href="/cart"><FontAwesomeIcon icon={faShoppingCart} /></a>
                            <div className="cart-indicator">{cartCount}</div>
                        </li>
                        <li className="login-li"><a href="/login"><FontAwesomeIcon icon={faSignInAlt} /></a></li>
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
                <ul></ul>
            </nav>
        </div>
    );



}

export default Header
