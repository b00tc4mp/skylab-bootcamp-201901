import React from 'react'

import logic from '../../logic'

function Topbar({ onGoToHome, onGoToProfile, onGoToNotifications, onGoToServices, onLogOut, onCreatingNewLink }) {

    return <section>
        <button onClick={onGoToHome}>COWORKING</button>
        <button onClick={onGoToProfile}>Profile</button>
        <button onClick={onGoToNotifications}>Notifications</button>
        <button onClick={onGoToServices}>Create Service</button>
        {(logic.isUserAdmin && <button onClick={onCreatingNewLink}>Generate new user link</button>)}
        <button onClick={onLogOut}>Log Out</button>
    </section>
}

export default Topbar