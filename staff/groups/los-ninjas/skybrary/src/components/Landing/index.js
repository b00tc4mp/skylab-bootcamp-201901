import React, { Fragment } from 'react'
import './index.sass'

function Landing({ onClickRegister, onClickLogin }) {

    return (
        <Fragment>
            <section className="section">
                <section className="container landing" onClick={e => e.preventDefault()}>
                    <a href="#" onClick={() => onClickRegister()}>Register</a>
                    <span>or</span>
                    <a href="#" onClick={() => onClickLogin()}>Login</a>.
                </section>
            </section>
        </Fragment>
    )
}

export default Landing