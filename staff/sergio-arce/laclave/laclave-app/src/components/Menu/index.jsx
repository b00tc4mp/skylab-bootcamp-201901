import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faEye } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

import logo from '../../img/logo.png'

function Menu({onSearchArtist, isUserLoggedIn, onLogout, onUserProfile, onGoToLogin, onGoToRegister}) {

    function handleSearch(e) {
        e.preventDefault()
        const query = e.target.query.value

        onSearchArtist(query)
    }
    return (
        <header className="menu">
            {/* //mobile - icons */}
            <nav className="menu__nav-icons">

                <Link to="/" className="menu__nav-icons__icon">
                    <FontAwesomeIcon icon={faHome} />
                </Link>
                <Link to="/" className="menu__nav-icons__icon">
                    <FontAwesomeIcon icon={faSearch} />
                </Link>

            </nav> 

            {/* //mobile - login + register */}
            <section className="menu__buttons">
            
                { !isUserLoggedIn && <button className="menu__buttons__login" onClick={onGoToLogin}>Login</button> }
                { !isUserLoggedIn && <button className="menu__buttons__register" onClick={onGoToRegister}>Join free</button> }
                { isUserLoggedIn && <button className="menu__buttons__logout" onClick={onLogout}>Log out</button> }                                         
                { isUserLoggedIn && <button className="menu__buttons__profile" onClick={onUserProfile}>Edit profile</button> }

            </section>

            {/* //all - main menu */}
            <nav className="menu__topbar">

                <div className="menu__topbar__left">
                    <Link to="/">
                        {/* <FontAwesomeIcon icon={faEye} className="menu__topbar__left__logo"/> */}
                        <img src={logo} alt="la clave salsa" />
                    </Link>
                    <form onSubmit={handleSearch} className="menu__topbar__left__search">                   
                        <FontAwesomeIcon icon={faSearch} className="menu__topbar__left__search-icon" />
                        <input name="query" placeholder="Search your congress" className="menu__topbar__left__search-input" autoCorrect={false}/>
                    </form>
                </div>

                <div className="menu__topbar__right">
                    {!isUserLoggedIn && <button className="menu__topbar__right__button-login" onClick={onGoToLogin}>Login</button> }
                    {!isUserLoggedIn && <button className="menu__topbar__right__button-register" onClick={onGoToRegister}>Join free</button> }
                    {isUserLoggedIn && <button className="menu__topbar__right__button-logout" onClick={onLogout}>Log out</button> }
                    {isUserLoggedIn && <button className="menu__topbar__right__button-profile" onClick={onUserProfile}>Edit profile</button> }
                </div>

            </nav>

            {/* //all - top bar */}
            <nav className="menu__nav-links">

               {isUserLoggedIn && <Link to="/" className="menu__nav-links__link">
                    You are a professional ???
                </Link> }
                
                {isUserLoggedIn &&<Link to="/create-artist" className="menu__nav-links__link">
                    Create your artist profile
                </Link>}
     
                {isUserLoggedIn && <Link to="/create-congres" className="menu__nav-links__link">
                    Create your congress
                </Link>}

            </nav> 

        </header>
    )
}

export default Menu


