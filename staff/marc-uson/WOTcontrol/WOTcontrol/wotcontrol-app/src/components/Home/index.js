import React, { useContext } from 'react'
import { Context } from '../Context'
import Toast from '../Toast'
import './index.sass' 

function Landing({onRegister, onLogin}){

    const { error, setError } = useContext(Context)

    return <main >
        <p>HOME</p>
        {error && <Toast error={error}/>}
    </main>

}

export default Home