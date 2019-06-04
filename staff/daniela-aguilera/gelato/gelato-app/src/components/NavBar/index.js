import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic'
// import { Modal } from '../Modal'
// import { RegisterForm } from '../RegisterForm'
// import { LoginForm } from '../LoginForm'
import { Logo } from '../Logo'

// {showRegisterModal && <Modal onClose={closeSignUp}><RegisterForm /></Modal>}
// {showLogInModal && <Modal onClose={closeLogin}><LoginForm /></Modal>}

export function NavBar () {
  const [showMenu, setShowMenu] = useState(false)

  // const [showRegisterModal, setShowRegisterModal] = useState(false)
  // const [showLogInModal, setShowLogInModal] = useState(false)

  // const openSignUp = () => setShowRegisterModal(true)
  // const closeSignUp = () => setShowRegisterModal(false)

  // const openLogin = () => setShowLogInModal(true)
  // const closeLogin = () => setShowLogInModal(false)

  async function _handleLogout (event) {
    await logic.logoutUser()
    window.location.href = '/'
  }

  const renderButtonsForLoggedUsers = () => (
    <div className='buttons'>
      <button className='button is-primary' onClick={_handleLogout}>
        <strong>Logout</strong>
      </button>
      <Link to='/my-basket' className='button is-primary'>
        <strong>My Basket</strong>
      </Link>
      <Link to='/create-your-order' className='button is-primary'>
        <strong>Order Now!</strong>
      </Link>
      <Link to='/user/profile' className='button is-primary'>
        <strong>My profile!</strong>
      </Link>
    </div>
  )

  const renderButtonsForNotLoggedUsers = () => (
    <div className='buttons'>
      <Link to='/register' className='button is-primary'>
        <strong>Sign up</strong>
      </Link>
      <Link to='/login' className='button is-light'>
        Log in
      </Link>
    </div>
  )

  const renderButtonsForAdmin = () => (
    <div className='buttons'>
      <Link to='/store/orders' className='button is-primary'>
        <strong>All Orders</strong>
      </Link>
      <button className='button is-primary' onClick={_handleLogout}>
        <strong>Logout</strong>
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
        <a onClick={() => setShowMenu(!showMenu)} role='button' className={`navbar-burger burger ${showMenu ? 'is-active' : ''}`} aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
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
