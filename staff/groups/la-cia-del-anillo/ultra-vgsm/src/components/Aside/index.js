import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

// 4971 - Nintendo Switch
// 4919 - Play Station 4
// 4920 - Xbox One
// 1 - PC

class Aside extends Component {
    handleId = id => {
        //event.preventDefault()
        console.log(id);
    };

    // handleSwitch = event => {
    //     event.preventDefault()
    //     logic.retrieveGamesByPlatform(4971)
    // }

    // changePlatform()={this.handleChangePlatform}

    // handlehandleChangePlatform = () => {
    //     this.setState({ XXXVisible: false, SwitchVisible: true });
    // };

    // event.preventDefault()
    // logic.retrieveGamesByPlatform(id)

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
        );
    }
}

export default Aside;
