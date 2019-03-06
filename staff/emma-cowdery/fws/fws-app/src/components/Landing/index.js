import React, { Fragment, useState } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'

export default withRouter(function Landing(props) {
    const handleGoToLogin = () => {
        props.history.push('/login')
    }
    return (
        <Fragment>
            <header className="landing-header">
                <p className="landing-header__logo">Co-dining</p>
                <div className="landing-header__others">
                    <button onClick={handleGoToLogin}>Sign in</button>
                </div>
            </header>
            <main>
                
            </main>
        </Fragment>
    )
})