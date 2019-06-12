import React from 'react'
import './index.sass'
import Logo from '../Logo'

function Landing({ toRegister, toLogin }) {

    return <section className="Landing" onClick={e => e.preventDefault()}>
        <Logo sizeX={"50%"} main={true} classToUse={"Landing__Logo"} />
        <div className="Landing__LanNav">
            <a  href="" onClick={() => toRegister()}>Register</a> 
            <span> or </span> 
            <a href="" onClick={() => toLogin()}>Login</a>
        </div>
    </section>
}

export default Landing