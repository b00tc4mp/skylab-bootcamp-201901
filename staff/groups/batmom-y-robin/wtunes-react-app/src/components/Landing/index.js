import React from 'react'

function Landing(onRegister, onLogin){

    return <section onClick={e => e.preventDefault()} >
        <a href="" onClick={() => onRegister()}>Register</a><span> or </span><a href="" onClick={() => onLogin()}>Login</a>
    </section>

}

export default Landing