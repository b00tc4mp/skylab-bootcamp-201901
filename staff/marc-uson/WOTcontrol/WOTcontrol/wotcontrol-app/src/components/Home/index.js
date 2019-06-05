import React, { useContext } from 'react'
import { Context } from '../Context'
import Toast from '../Toast'
import Navbar from '../Navbar'
import './index.sass' 

function Home({ onLogout }) {

    const { error, setError } = useContext(Context)

    return <main >
        <Navbar onLogout={onLogout}/>
        <h1>HOME</h1>
        {error && <Toast error={error}/>}
    </main>

}

export default Home