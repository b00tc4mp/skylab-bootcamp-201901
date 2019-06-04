import React, { useState } from 'react'
import UserAccount from '../UserAccount'
import UserInfo from '../UserInfo/index.js'
import logic from '../../logic'
import './index.sass'
import '../../../node_modules/bulma/bulma.sass'

function Header({ initSession, userLogged }) {

  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const [userinfo, setUserInfo] = useState(false);

  const openLogin = () => setLogin(true)
  const closeLogin = () => setLogin(false)
  const openRegister = () => setRegister(true)
  const closeRegister = () => setRegister(false)
  const userRegistered = () => {
    setRegister(false)
    setLogin(true)
  }

  const logOut = () => {
    logic.logOut()
    window.location.href = '/'
  }

  const handleUserInfo = async ()=> {
    const user = await logic.retrieveUser()
    setUserInfo(user)
  }



  return (
    <header className='header'>
      <div className='header__cnt'>
        {logic.isUserLoggedIn && userinfo ? <UserInfo logOut={logOut} user={userinfo} /> : <UserAccount showLogin={showLogin} showRegister={showRegister} userRegistered={userRegistered} userLogged={userLogged} closeRegister={closeRegister} openRegister={openRegister} closeLogin={closeLogin} openLogin={openLogin}/>}
      </div>
    </header>
  );
}

export default Header