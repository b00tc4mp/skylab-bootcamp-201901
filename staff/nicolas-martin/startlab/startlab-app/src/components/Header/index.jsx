import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ isAdmin, isLoggedIn }) => {
  // {console.log(isAdmin, isLoggedIn)}
  return (
  <header className="header">
    <span className="icn-logo"><i className="material-icons">code</i></span>
    <ul className="main-nav">
      <li><NavLink exact to="/" activeStyle={{ background: 'tomato' }}>Home</NavLink></li>
      <li><NavLink to="/register" activeClassName="myActiveClass">Register</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
    </ul>
  </header>
)}

export default Header