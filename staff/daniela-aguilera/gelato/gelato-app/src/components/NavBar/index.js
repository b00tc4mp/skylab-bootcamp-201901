import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic'
// import { Modal } from '../Modal'
// import { RegisterForm } from '../RegisterForm'
// import { LoginForm } from '../LoginForm'
import { Logo } from '../Logo'

export function NavBar () {
  const [showMenu, setShowMenu] = useState(false)

  async function _handleLogout (event) {
    await logic.logoutUser()
    window.location.href = '/'
  }

  const renderButtonsForLoggedUsers = () => (
    <div className='buttons'>
      <Link to='/my-basket' className='button is-primary'>
        My Basket
      </Link>
      <Link to='/create-your-order' className='button is-primary'>
        Order Now!
      </Link>
      <Link to='/user/profile' className='button is-primary'>
        My profile!
      </Link>
      <button className='button is-primary' onClick={_handleLogout}>
        <i className='fas fa-sign-out-alt' /> Logout
      </button>
    </div>
  )

  const renderButtonsForNotLoggedUsers = () => (
    <div className='buttons'>
      <Link to='/register' className='button is-primary'>
        Sign up
      </Link>
      <Link to='/login' className='button is-light'>
        Log in
      </Link>
    </div>
  )

  const renderButtonsForAdmin = () => (
    <div className='buttons'>
      <Link to='/store/orders' className='button is-primary'>
        All Orders
      </Link>
      <Link to='/store/event' className='button is-primary'>
        Create Event
      </Link>
      <button className='button' onClick={_handleLogout}>
        <span className='icon is-small'>
          <i className='fas fa-sign-out-alt' />
        </span>
        <span>Logout</span>
      </button>
    </div>
  )

  console.log(logic.isUserAdmin)

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/'>
          <Logo />
        </Link>
        <a href='#show-menu' onClick={() => setShowMenu(!showMenu)} role='button' className={`navbar-burger burger ${showMenu ? 'is-active' : ''}`} aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
      </div>
      <div className={`navbar-menu ${showMenu ? 'is-active' : ''}`}>
        <div className='navbar-end'>
          <div className='navbar-item'>
            {logic.isUserLoggedIn && !logic.isUserAdmin && renderButtonsForLoggedUsers()}
            {logic.isUserLoggedIn && logic.isUserAdmin && renderButtonsForAdmin()}
            {!logic.isUserLoggedIn && renderButtonsForNotLoggedUsers()}
          </div>
        </div>
      </div>
    </nav>
  )
}
