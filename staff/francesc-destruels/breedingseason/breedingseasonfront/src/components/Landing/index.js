import React from 'react'
import './index.sass'
import Logo from '../Logo'

function Landing({ toRegister, toLogin }) {

    return <section className="landing" onClick={e => e.preventDefault()}>
        <Logo sizeX={"500vh"} main={true} />
        <a href="" onClick={() => toRegister()}>Register</a> <span> or </span> <a href="" onClick={() => toLogin()}>Login</a>.
    </section>
}

export default Landing