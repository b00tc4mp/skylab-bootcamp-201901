import React from 'react'
import './index.sass'
import logoGreen from '../../assets/images/logoTextGreen.png'

function Landing({onRegister, onLogin}){

    return <div className='uk-flex uk-flex-center uk-position-center'>
        <div className='uk-container uk-text-center'>
            <img width="371" height="294" src={logoGreen} />
            <p >The easiest way to monitor & control your process</p>
            <p className="uk-align-center" onClick={e => e.preventDefault()}>
                    <a className="uk-button uk-button-default" href="" onClick={() => onRegister()}>Sign Up</a>
                    <a className="uk-button uk-button-default" href="" onClick={() => onLogin()}>Sign In</a>
            </p>
        </div>
    </div>

}

export default Landing