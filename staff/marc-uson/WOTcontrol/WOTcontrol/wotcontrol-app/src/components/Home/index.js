import React, { useContext } from 'react'
import { Context } from '../Context'
import Alert from '../Alert'
import Navbar from '../Navbar'
import Device from '../Device'
import './index.sass' 

function Home({ onLogout, onUserUpdate, user, onDeviceAdd }) {

    const { error, setError  } = useContext(Context)

    return <main >
        <Navbar onLogout={onLogout} onUserUpdate={onUserUpdate} user={user} onDeviceAdd={onDeviceAdd} />
        <Device/>
        {error && <Alert error={error}/>}
    </main>

}

export default Home