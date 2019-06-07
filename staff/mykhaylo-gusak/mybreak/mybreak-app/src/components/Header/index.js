import React, { useState } from 'react'
import UserAccount from '../UserAccount'
import UserInfo from '../UserInfo/index.js'
import logic from '../../logic'
import './index.sass'
import '../../../node_modules/bulma/bulma.sass'

function Header({ handleRetrieveUser, logOut, user, showRetrieveUser, handleOpenMenu, handleOpenCard }) {

  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);


  const openLogin = () => setLogin(true)
  const closeLogin = () => setLogin(false)
  const openRegister = () => setRegister(true)
  const closeRegister = () => setRegister(false)
  const userRegistered = () => {
    setRegister(false)
    setLogin(true)
  }

  return (
    <header className='g-header'>
      <div className='g-header__cnt'>
        {logic.isUserLoggedIn ? !showRetrieveUser && <UserInfo user={user} logOut={logOut} handleOpenMenu={handleOpenMenu} handleOpenCard={handleOpenCard} /> : <UserAccount showLogin={showLogin} openLogin={openLogin} closeLogin={closeLogin} showRegister={showRegister} openRegister={openRegister} closeRegister={closeRegister} userRegistered={userRegistered} handleRetrieveUser={handleRetrieveUser} />}
      </div>
    </header>
  );
}

export default Header