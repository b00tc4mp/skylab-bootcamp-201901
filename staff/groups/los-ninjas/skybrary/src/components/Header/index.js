import React from 'react'
import logic from '../../logic'
import './index.scss'

function Header(props) {
   const { onLogout } = props
   const userLogged = logic.isUserLoggedIn

   console.log(props.history)
   return <header className="great-vibes header">
        <div className="container">
            <h1>Skybrary</h1>
            <hr />
        </div>
        {userLogged &&
            <button className="button is-small is-pulled-left" onClick={() => {onLogout()}}>
                <i className="fas fa-power-off" />
                <span>
                    Log Out
                </span>
            </button>
        }
    </header>
}

export default Header
