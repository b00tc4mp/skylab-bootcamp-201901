import React from 'react'
import { Link } from 'react-router-dom'
import literals from './literals.js'
import logic from '../../logic'
import logo from '../../assets/logo/icon_v2_black.png'

function NavBar({ lang, onLogout }) {

  function handleLogout(e) {
    e.preventDefault()
    onLogout()
  }

  const { title, logout, home } = literals[lang]

  return <>
    <div>
      <nav className="uk-navbar-container  uk-navbar-transparent" data-uk-navbar>
        <div className="mini-margin-top">
          <ul className="uk-navbar-nav">
            <li className="uk-margin-left"><img src={logo} alt="logo-PhotoPin" width="40" height="40" /></li>
            <li className="uk-margin-left"><h2>{title}</h2></li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {/* <li className="uk-active"><a href="#">{home}</a></li> */}
            <li className="uk-active"><Link to={"/home"}>{home}</Link></li>
            {logic.isUserLoggedIn && <li><a href="#" onClick={handleLogout}>{logout}</a></li>}
          </ul>
        </div>
      </nav>
    </div>
  </>
}

export default NavBar