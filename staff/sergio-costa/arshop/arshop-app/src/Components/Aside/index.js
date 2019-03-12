import React, { Component } from 'react'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'
import './index.sass'

class Aside extends Component {

    // goToUploadProduct = () => {
    //     if (logic.isUserLoggedIn) this.props.history.push(`/upload/product`)
    //     else this.props.history.push('/login')
    // }

    // goToMyProfile = () => {
    //     if (logic.isUserLoggedIn) this.props.history.push(`/profile/info`)
    //     else this.props.history.push('/login')
    // }

    // goToMyProducts = () => {
    //     if (logic.isUserLoggedIn) this.props.history.push(`/user/products`)
    //     else this.props.history.push('/login')
    // }

    // goToFavorites = () => {
    //     if (logic.isUserLoggedIn) this.props.history.push('/favorites')
    //     else this.props.history.push('/login')
    // }

    _hideAside = () => {
        const overlay = document.querySelector('.sidebar-overlay')
        const aside = document.querySelector('.sidebar')

        overlay.className = 'sidebar-overlay'
        aside.className = 'sidebar'
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
                                <p>Username</p>
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
                                        <li className="menu__item" onClick={() => this._hideAside()}>
                                            <Link to="/user/profile" title="profile" className="menu__link">
                                                My Profile
                                        </Link>
                                        </li>
                                        <li className="menu__item" onClick={() => this._hideAside()}>
                                            <Link to="/user/products" title="products" className="menu__link">
                                                My Products
                                        </Link>
                                        </li>
                                        <li className="menu__item" onClick={() => this._hideAside()}>
                                            <Link to="/favorites" title="favoroites" className="menu__link">
                                                Favorites
                                        </Link>
                                        </li>
                                    </div>
                                </ul>
                            </nav>
                        </div>}
                        {!logic.isUserLoggedIn && <div className="sidebar__scrolling-content-scroll">
                            <nav className="menu">
                                <ul>
                                    <li onClick={() => this._hideAside()}>
                                        <Link to="/login" title="login" className="menu__link">
                                            Login
                                        </Link>
                                    </li>
                                    <li onClick={() => this._hideAside()}>
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