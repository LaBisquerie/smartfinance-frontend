import React from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="header-logo">
                <img className="img-fluid" src={logo} alt="" height={45} width={45} />
            </div>
            <div className="header-nav">
                <ul className="header-nav__list list-unstyled">
                    <li className="header-nav__item">
                        <Link to="/" className="header-nav__link">
                            A propos
                        </Link>
                    </li>
                    <li className="header-nav__item">
                        <Link to="/" className="header-nav__link">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
