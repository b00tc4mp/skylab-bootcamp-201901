import React from 'react'

function Logout({ onLogout }) {
    return <>
        <div className="uk-navbar-item">
            <button className="uk-button uk-button-primary" onClick={onLogout}>Logout</button>
        </div>
    </> 
}

export default Logout 