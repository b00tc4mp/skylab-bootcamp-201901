import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ isAdmin, isLoggedIn, onLogOut }) => {
  // {console.log(isAdmin, isLoggedIn)}
  return (
  <header className="header">
    <span className="icn-logo"><i className="material-icons">code</i></span>
    <ul className="main-nav">

      <li><NavLink exact to="/" activeStyle={{ background: 'tomato' }}>Home</NavLink></li>

      <li>{!isLoggedIn && <NavLink to="/register" activeClassName="myActiveClass">Register</NavLink>}</li>

      <li>{!isLoggedIn && <NavLink to="/login">Login</NavLink>}</li>

      <li>{isLoggedIn && <NavLink to="/logout" onClick={onLogOut}>Logout</NavLink>}</li>
      
      <li>{isAdmin && <NavLink exact to="/admin/exercises">Exercises</NavLink>}</li>

    </ul>
  </header>
)}

export default Header