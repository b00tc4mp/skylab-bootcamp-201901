import React, { Component } from 'react'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'
import './index.sass'

class Aside extends Component {

    _hideAside = () => {
        const overlay = document.querySelector('.sidebar-overlay')
        const aside = document.querySelector('.sidebar')

        overlay.className = 'sidebar-overlay'
        aside.className = 'sidebar'
    }

    onLogout = () => {
        this.props.history.push('/upload/product') //Chapu pero funcional
        return logic.logOutUser()
    }

    goToUploadProduct = () => {
        this.props.history.push('/upload/product')
    }


    render() {
        return <section>
            <div className="sidebar-overlay" onClick={() => this._hideAside()}>
                <aside className="sidebar">
                    <div className="sidebar__scrolling-content">
                        {logic.isUserLoggedIn && <div className="sidebar__scrolling-content-scroll">
                            <div className="sidebar__user">
                                <i className="fas fa-user"></i>
                                <p className="sidebar__user--text">Username</p>
                            </div>
                            <nav className="menu">
                                <ul className="menu__list">
                                    <li className="menu__upload" onClick={() => this._hideAside()}>
                                        <button className="menu__btn" onClick={() => this.goToUploadProduct()}>
                                            <i className="fas fa-plus-circle"></i>
                                            <p className="menu__btn--text">Uplaod Product</p>
                                        </button>
                                    </li>
                                    <div className="menu__items">
                                        {/* <li className="menu__item" onClick={() => this._hideAside()}>
                                            <Link to="/user/profile" title="profile" className="menu__link">
                                                My Profile
                                            </Link>
                                        </li> */}
                                        <li className="menu__item" onClick={() => this._hideAside()}>
                                            <Link to="/user/profile/products" title="products" className="menu__link">
                                                My Products
                                            </Link>
                                        </li>
                                        <li className="menu__item" onClick={() => this._hideAside()}>
                                            <Link to="/user/profile/favorites" title="favoroites" className="menu__link">
                                                Favorites
                                            </Link>
                                        </li>
                                        <li className="menu__item" onClick={() => this.onLogout()}>
                                            <p title="logout" className="menu__link">
                                            <i className="fas fa-sign-out-alt"></i>
                                                Logout
                                            </p>
                                        </li>
                                    </div>
                                </ul>
                            </nav>
                        </div>}
                        {!logic.isUserLoggedIn && <div className="sidebar__scrolling-content-scroll">
                            <nav className="menu">
                                <ul>
                                    <li className="menu__item" onClick={() => this._hideAside()}>
                                        <Link to="/login" title="login" className="menu__link">
                                        Login
                                        </Link>
                                    </li>
                                    <li className="menu__item" onClick={() => this._hideAside()}>
                                        <Link to="/register" title="register" className="menu__link">
                                            Register
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>}
                    </div>
                </aside>
            </div>
        </section>
    }
}

export default withRouter(Aside)