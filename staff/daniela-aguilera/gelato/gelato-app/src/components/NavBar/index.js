import React, { useState } from 'react'
import { Modal } from '../Modal'
import { RegisterForm } from '../RegisterForm'
import { LoginForm } from '../LoginForm'

export default function NavBar () {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLogInModal, setShowLogInModal] = useState(false)

  const openSignUp = () => setShowRegisterModal(true)
  const closeSignUp = () => setShowRegisterModal(false)

  const openLogin = () => setShowLogInModal(true)
  const closeLogin = () => setShowLogInModal(false)

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='https://bulma.io'>
          <img src='' width='112' height='28' />
        </a>

        <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <button className='button is-primary' onClick={openSignUp}>
                <strong>Sign up</strong>
              </button>
              <button className='button is-light' onClick={openLogin}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRegisterModal && <Modal onClose={closeSignUp}><RegisterForm /></Modal>}
      {showLogInModal && <Modal onClose={closeLogin}><LoginForm /></Modal>}
    </nav>
  )
}
