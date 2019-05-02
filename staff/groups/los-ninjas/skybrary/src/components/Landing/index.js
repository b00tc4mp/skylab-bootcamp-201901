import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.scss'

function Landing({ onClickRegister, onClickLogin }) {

    return (
        <section className="section landing">
            <Header/>
            <section className="landing__buttons-container columns" onClick={e => e.preventDefault()}>
                <div className="column is-3 is-offset-2">
                    <a className="button is-primary is-large" href="#" onClick={() => onClickRegister()}>Register</a>
                </div>
                <div className="column is-2">
                    <span className="or">or</span>
                </div>
                <div className="column is-3">
                    <a className="button is-link is-large" href="#" onClick={() => onClickLogin()}>Login</a>
                </div>
            </section>
            <Footer />
        </section>
    )
}

export default Landing