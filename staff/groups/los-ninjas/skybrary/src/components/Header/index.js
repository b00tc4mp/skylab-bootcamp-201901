import React from 'react'
import logic from '../../logic'
import './index.scss'

function Header(props) {
   const { onLogout } = props
   const userLogged = logic.isUserLoggedIn
   return <header className="great-vibes header">
        <div className="container">
            <h1>Skybrary</h1>
            <hr />
        </div>
        {userLogged && <button className="button is-pulled-left" onClick={() => {onLogout()}}>Log Out</button>}
    </header>
}

export default Header
