import React from 'react'
import './index.sass'

function Landing({ onClickRegister, onClickLogin }) {

    return <section className="landing" onClick={e => e.preventDefault()}>
        <a href="#" onClick={() => onClickRegister()}>Register</a> <span>or</span> 
        <a href="#" onClick={() => onClickLogin()}>Login</a>.
        </section>
}

export default Landing