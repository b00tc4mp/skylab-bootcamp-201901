import React from 'react'
import './index.sass'


function Landing({onRegister, onLogin}){

    return <main className="uk-container uk-container-large container-landing uk-background-muted" >
        <div >
            <section >
                <div className= "">   
                    <div className="container-button uk-container uk-container-expand "  onClick={e => e.preventDefault()}>
                        <a  className="uk-button uk-button-default uk-width-1-1 uk-button-large-bottom uk-margin-bottom uk-text-large uk-text-muted" href="register" onClick={() => onRegister()}>Sign Up</a>
                        <a  className="uk-button uk-button-default uk-width-1-1 uk-button-large-bottom uk-margin-bottom uk-text-large uk-text-muted" href="login" onClick={() => onLogin()}>Sign In</a>
                    </div>
                </div>
            </section>
        </div>
    </main>

}

export default Landing