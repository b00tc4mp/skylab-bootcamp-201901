import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-router-dom'

function Menu({onSearchArtist, isUserLoggedIn, onLogout, onUserProfile, onGoToCreate, onGoToLogin, onGoToRegister, onGoToCongress}) {

     
     
    function handleSearch(e) {
        e.preventDefault()
        const query = e.target.query.value

        onSearchArtist(query)
        console.log(query)
    }
    return (
        <header className="menu">
            {/* //mobile - icons */}
            <nav className="menu__nav-icons">

                <Link to="/" className="menu__nav-icons__icon">
                    <FontAwesomeIcon icon="home" />
                </Link>
                {/* <Link to="/" className="menu__nav-icons__icon">
                    <FontAwesomeIcon icon="home" />
                </Link> */}
                {/* <Link to="/" className="menu__nav-icons__icon">
                    <FontAwesomeIcon icon="home" />
                </Link> */}
                <Link to="/" className="menu__nav-icons__icon">
                    <FontAwesomeIcon icon="search" />
                </Link>

            </nav> 

            {/* //mobile - login + register */}
            <section className="menu__buttons">
            
                { !isUserLoggedIn && <button className="menu__buttons__login" onClick={onGoToLogin}>Login</button> }
                { !isUserLoggedIn && <button className="menu__buttons__register" onClick={onGoToRegister}>Join free</button> }
 
                { isUserLoggedIn && <button className="menu__buttons__logout" onClick={onLogout}>Log out</button> }
                
                                                                    {/*********** donde se enjecuta esta prop */}
                { isUserLoggedIn && <button className="menu__buttons__profile" onClick={onUserProfile}>Edit profile</button> }

                {/* { isUserLoggedIn && <button className="menu__buttons__congress" onClick={onGoToCreate} >Go up Congress</button> } */}

            </section>

            {/* //all - main menu */}
            <nav className="menu__topbar">

                <div className="menu__topbar__left">
                    <Link to="/">
                        <FontAwesomeIcon icon="eye" className="menu__topbar__left__logo"/>
                    </Link>

                    <form onSubmit={handleSearch} className="menu__topbar__left__search">                   
                        <FontAwesomeIcon icon="search" className="menu__topbar__left__search-icon" />
                        <input name="query" placeholder="Search your congress" className="menu__topbar__left__search-input" autoCorrect={false}/>
                    </form>
                </div>

                <div className="menu__topbar__right">

                    {!isUserLoggedIn && <button className="menu__topbar__right__button-login" onClick={onGoToLogin}>Login</button> }
                    {!isUserLoggedIn && <button className="menu__topbar__right__button-register" onClick={onGoToRegister}>Join free</button> }

                    {/* {isUserLoggedIn && <button className="menu__topbar__right__button-congress"  onClick={onGoToCreate}> Go up Congress</button>}  */}
                    {isUserLoggedIn && <button className="menu__topbar__right__button-logout" onClick={onLogout}>Log out</button> }
                    {isUserLoggedIn && <button className="menu__topbar__right__button-profile" onClick={onUserProfile}>Edit profile</button> }
  
                </div>

            </nav>

            {/* //all - top bar */}
            <nav className="menu__nav-links">

                <Link to="/" className="menu__nav-links__link">
                    Eres un profesional???
                </Link> 
                <Link to="/create" className="menu__nav-links__link">
                    Crea tu perfil de artista
                </Link>
                {/* <Link to="/" className="menu__nav-links__link">
                    Tienes un congresso
                </Link> */}
                <Link to="/create" className="menu__nav-links__link">
                    Crea tu congresso
                </Link>

            </nav> 

        </header>
    )
}

export default Menu


