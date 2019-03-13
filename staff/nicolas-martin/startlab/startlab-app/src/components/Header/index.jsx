import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ isAdmin, isLoggedIn, onLogOut }) => {
  // {console.log(isAdmin, isLoggedIn)}
  return (
  <nav className="header" aria-label="main navigation">

    <ul className="main-nav">

      <a className="navbar-item" href="/">
        <i className="material-icons">code</i>
      </a>

      <li><NavLink exact to="/" className="navbar-item">Home</NavLink></li>

      <li>{!isLoggedIn && <NavLink to="/register" className="navbar-item">Register</NavLink>}</li>

      <li>{!isLoggedIn && <NavLink className="navbar-item" to="/login">Login</NavLink>}</li>

      <li>{isLoggedIn && <NavLink className="navbar-item" to="/logout" onClick={onLogOut}>Logout</NavLink>}</li>
      
      <li>{isAdmin && <NavLink className="navbar-item" exact to="/admin/exercises">Exercises</NavLink>}</li>

      <li>{isAdmin && <NavLink className="navbar-item" exact to="/admin/invitations">Invitations</NavLink>}</li>

    </ul>
  </nav>
)}

export default Header