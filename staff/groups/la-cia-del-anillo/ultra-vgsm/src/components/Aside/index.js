import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import logic from '../../logic';

class Aside extends Component {
    handleId = id => {
        console.log(id);
    };

    render() {
        return (
            <Fragment>
            <div className="sidebar-overlay"></div>
                <aside className="sidebar">
                    <div className="sidebar__scrolling-content">
                        <div className="sidebar__scrolling-content-scroll">
                            <div className="sidebar__fixed-logo">
                                <a href="/" title="Ultra-VGMS" className="logo logo--black">
                                    <img
                                        src="./images/logo.png"
                                        alt="Ultra-VGMS Logo"
                                        className="logo__image"
                                    />
                                </a>
                            </div>

                            <nav className="menu">
                                <ul className="menu__list">
                                    <li className="menu__item">
                                        <Link to="/" title="Home" className="menu__link">
                                            <i className="fas fa-home" />
                                            Home
                                        </Link>
                                    </li>
                                    {logic.userLoggedIn && (
                                        <li className="menu__item">
                                            <Link
                                                to="/favorites"
                                                title="Favorites"
                                                className="menu__link"
                                            >
                                                <i className="fas fa-heart" />
                                                Favorites
                                            </Link>
                                        </li>
                                    )}
                                    {logic.userLoggedIn && (
                                        <li className="menu__item menu__item-logout">
                                            <button
                                                onClick={this.props.onLogout}
                                                className="menu__link"
                                            >
                                                <i className="fas fa-lock" />
                                                Logout
                                            </button>
                                        </li>
                                    )}
                                    {logic.userLoggedIn || (
                                        <li className="menu__item">
                                            <Link to="/login" title="Login" className="menu__link">
                                                <i className="fas fa-unlock-alt" />
                                                Login
                                            </Link>
                                        </li>
                                    )}
                                    {logic.userLoggedIn || (
                                        <li className="menu__item">
                                            <Link
                                                to="/register"
                                                title="Register"
                                                className="menu__link"
                                            >
                                                <i className="fas fa-sign-out-alt" />
                                                Register
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                            <nav className="menu">
                                <h3 className="menu__title">Platforms</h3>
                                <ul className="menu__list">
                                    <li className="menu__item">
                                        <Link to="/platform/4971" className="menu__link">
                                            Nintendo Switch
                                        </Link>
                                    </li>
                                    <li className="menu__item">
                                        <Link to="/platform/4919" className="menu__link">
                                            PlayStation 4
                                        </Link>
                                    </li>
                                    <li className="menu__item">
                                        <Link to="/platform/4920" className="menu__link">
                                            Xbox One
                                        </Link>
                                    </li>
                                    <li className="menu__item">
                                        <Link to="/platform/1" className="menu__link">
                                            PC
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </aside>
                </Fragment>
        );
    }
}

export default Aside;
