import React from 'react'
import './index.sass' 

function Landing({onRegister, onLogin}){

    return <main className="mainlanding">
        <div className="container">
            <section className="columns is-multiline has-text-centered">
                <div className="column is-8-desktop is-6-tablet is-10-mobile is-offset-3">   
                    <p className="title is-2">Weatunes</p>
                    <p className="subtitle">Welcome to our application</p>
                </div>
                <div className="column is-8-desktop is-6-tablet is-10-mobile is-offset-3">
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