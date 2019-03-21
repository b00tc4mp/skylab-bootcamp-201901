import React from 'react'
import './index.sass'

function Landing({ goToLogin, goToRegister }) {

    return <section className="landing">
    <div className="landing__div">
        <h1 className="landing__title">Welcome to OSI</h1>
    </div>
    <h4 className="landing__advise">Full-screen mode is advised for a better experience</h4>
    <div src="../../media/logo.png" alt="metallic logo" className="landing__logo"></div>
    <div className="landing__buttons">
        <button className="landing__login" onClick={goToLogin}>Login</button>
        <button className="landing__register" onClick={goToRegister}>Register</button>
    </div>
    </section>
}

export default Landing