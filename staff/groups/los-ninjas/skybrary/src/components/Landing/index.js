import React, { Fragment } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.scss'

function Landing({ onClickRegister, onClickLogin }) {

    return (
        <Fragment>
            <section className="section landing">
                <Header/>
                <section className="buttons-container " onClick={e => e.preventDefault()}>
                    <a className="button is-light" href="#" onClick={() => onClickRegister()}>Register</a>
                    <span className="or">or</span>
                    <a className="button is-light" href="#" onClick={() => onClickLogin()}>Login</a>
                </section>
                <Footer />
            </section>
        </Fragment>
    )
}

export default Landing