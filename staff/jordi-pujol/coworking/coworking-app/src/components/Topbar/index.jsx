import React from 'react'

import logic from '../../logic'

function Topbar({ onGoToHome, onGoToProfile, onGoToNotifications, onGoToServices, onLogOut, onCreatingNewLink }) {

    return <section className="topbar">
        <image className="topbar__button--icon" onClick={onGoToHome}/>
        <button className="topbar__button" onClick={onGoToProfile}>Profile</button>
        <button className="topbar__button" onClick={onGoToNotifications}>Notifications</button>
        <button className="topbar__button" onClick={onGoToServices}>Create Service</button>
        {(logic.isUserAdmin && <button className="topbar__button" onClick={onCreatingNewLink}>Generate new user link</button>)}
        <button className="topbar__button--logout" onClick={onLogOut}>Log Out</button>
    </section>
}

export default Topbar