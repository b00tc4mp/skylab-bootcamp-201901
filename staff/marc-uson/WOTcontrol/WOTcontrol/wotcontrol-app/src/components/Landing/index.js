import React, { useContext } from 'react'
import { Context } from '../Context'
import Toast from '../Toast'
import './index.sass' 

function Landing({onRegister, onLogin}){

    const { error, setError } = useContext(Context)

    return <main className="main-landing">
        <div className="container-landing">
            <section className="columns is-mobile has-text-centered is-centered myColumns">
                <div className="title-landing column is-12-desktop is-12-tablet is-10-mobile ">   
                    <p className="title is-2">WOTcontrol</p>
                    <p className="subtitle">The easiest way to monitor & control your process</p>
                    <p className="buttons" onClick={e => e.preventDefault()}>
                        <a className="button is-fullwidth is-primary" href="" onClick={() => onRegister()}>Sign Up</a>
                        <a className="button is-fullwidth is-primary" href="" onClick={() => onLogin()}>Sign In</a>
                    </p>
                </div>
            </section>
        </div>
        {error && <Toast error={error}/>}
    </main>

}

export default Landing