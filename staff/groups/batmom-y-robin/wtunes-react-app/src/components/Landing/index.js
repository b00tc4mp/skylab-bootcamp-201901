import React from 'react'
import './index.sass' 

function Landing({onRegister, onLogin}){

    return <main className="main-landing">
        <div className="container-landing">
            <section className="columns is-mobile has-text-centered is-centered myColumns">
                <div className="title-landing column is-12-desktop is-12-tablet is-10-mobile ">   
                    <p className="title is-2">Weatunes</p>
                    <p className="subtitle">Welcome to our application</p>
                    <p className="buttons" onClick={e => e.preventDefault()}>
                        <a className="button is-fullwidth is-primary" href="" onClick={() => onRegister()}>Sign Up</a>
                        <a className="button is-fullwidth is-primary" href="" onClick={() => onLogin()}>Sign In</a>
                    </p>
                </div>
            </section>
        </div>
    </main>

}

export default Landing