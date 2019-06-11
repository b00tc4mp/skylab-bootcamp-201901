import React from 'react'
import logoGreen from '../../assets/images/logoTextShortGreen.png'

function Landing({onRegister, onLogin}){

    return <div className="card uk-flex uk-flex-center uk-position-center">
        <div className="uk-card-body uk-width-xlarge uk-padding uk-text-center">
            <img alt="WOTcon logo" width="232" height="184" src={logoGreen} />
            <p className="select-none" >The easiest way to monitor & control your process</p>
            <p className="uk-align-center" onClick={e => e.preventDefault()}>
                    <a className="uk-button uk-button-default" href=" " onClick={() => onRegister()}>Sign Up</a>
                    <a className="uk-button uk-button-default" href=" " onClick={() => onLogin()}>Sign In</a>
            </p>
        </div>
    </div>

}

export default Landing