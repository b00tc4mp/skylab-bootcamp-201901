import React from 'react'
import './index.sass'

function Landing({ onRegister, onLogin }) {

    return <section className="landing" onClick={e => e.preventDefault()}>
        <a href="#" onClick={() => onRegister()}>Register</a> <span>or</span> 
        <a href="#" onClick={() => onLogin()}>Login</a>.
        </section>
}

export default Landing