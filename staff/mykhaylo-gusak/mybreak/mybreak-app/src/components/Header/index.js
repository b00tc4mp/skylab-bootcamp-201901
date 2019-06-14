import React, { useState } from 'react'
import UserAccount from '../UserAccount'
import UserInfo from '../UserInfo/index.js'
import logic from '../../logic'
import './index.sass'
import '../../../node_modules/bulma/bulma.sass'

function Header({ handleRetrieveUser, logOut, user, handleOpenMenu, handleOpenCard }) {

  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);


  const handleOpenLogin = () => {
    setRegister(false)
    setLogin(true)
  }
  const handleCloseLogin = () => setLogin(false)

  const handleOpenRegister = () => {
    setLogin(false)
    setRegister(true)
  }
  const handleCloseRegister = () => setRegister(false)
  
  const handleUserRegistered = () => {
    setRegister(false)
    setLogin(true)
  }

  return (
    <header className='g-header'>
      <div className='g-header__cnt'>
        {logic.isUserLoggedIn ? <UserInfo user={user} logOut={logOut} handleOpenMenu={handleOpenMenu} handleOpenCard={handleOpenCard} /> : <UserAccount showLogin={showLogin} handleOpenLogin={handleOpenLogin} handleCloseLogin={handleCloseLogin} showRegister={showRegister} handleOpenRegister={handleOpenRegister} handleCloseRegister={handleCloseRegister} handleUserRegistered={handleUserRegistered} handleRetrieveUser={handleRetrieveUser} />}
      </div>
    </header>
  );
}

export default Header