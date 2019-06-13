import React from 'react'
import './index.sass'
import Logo from '../Logo'

function Landing({ toRegister, toLogin }) {

    return <section className="Landing" onClick={e => e.preventDefault()}>
        <Logo sizeX={"70%"} main={true} classToUse={"Landing__Logo"} />
        <div className="Landing__LanNav">
            <button  className="button is-link is-rounded is-large" onClick={() => toRegister()}>Register</button>
            <span> or </span> 
            <button  className="button is-link is-rounded is-large" onClick={() => toLogin()}>Login</button>
        </div>
    </section>
}

export default Landing