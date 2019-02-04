import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';

class Aside extends Component {

    handleLol = (id) => {
        console.log(id);
    }

    render() {
        return (
            <aside className="sidebar">
                <div className="sidebar__scrolling-content">
                    <div className="sidebar__scrolling-content-scroll">
                        <div className="sidebar__fixed-logo">
                            <a href="#home" title="Ultra-VGMS" className="logo logo--black">
                                <img
                                    src="./images/logo.png"
                                    alt="Ultra-VGMS Logo"
                                    className="logo__image"
                                />
                                Ultra-VGMS
                            </a>
                        </div>

                        <nav className="menu">
                            <ul className="menu__list">
                                <li className="menu__item">
                                    <a
                                        href="#home"
                                        title="Home"
                                        className="menu__link menu__link--selected"
                                    >
                                        <i className="fas fa-home" />
                                        Home
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a href="#home" title="Login" className="menu__link">
                                        <i className="fas fa-unlock-alt" />
                                        Login
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a href="#home" title="Register" className="menu__link">
                                        <i className="fas fa-sign-out-alt" />
                                        Register
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <nav className="menu">
                            <h3 className="menu__title">Plataformas</h3>
                            <ul className="menu__list">
                                <li className="menu__item">
                                    <a href="#home" title="Home" className="menu__link" onClick={() => this.handleLol('1')}>
                                        Nintendo Switch
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a href="#home" title="Login" className="menu__link" onClick={() => this.handleLol('2')}>
                                        xBox One
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a href="#home" title="Register" className="menu__link" onClick={() => this.handleLol('3')}>
                                        PlayStation 4
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a href="#home" title="Register" className="menu__link" onClick={() => this.handleLol('4')}>
                                        PC
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </aside>
        );
    }
}

export default Aside;
