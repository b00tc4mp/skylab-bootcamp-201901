import React from 'react'
import './index.sass'

function Landing({ toRegister, toLogin }) {

    return <section className="landing" onClick={e => e.preventDefault()}>
        <a href="" onClick={() => toRegister()}>Register</a> <span> or </span> <a href="" onClick={() => toLogin()}>Login</a>.
    </section>
}

export default Landing