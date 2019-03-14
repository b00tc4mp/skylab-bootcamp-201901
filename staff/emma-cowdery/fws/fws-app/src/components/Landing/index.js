import React, { Fragment, useState } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'

export default withRouter(function Landing(props) {

    return (
        <Fragment>
            <header className="landing-header">
                <p className="landing-header__logo">Co-dining</p>
                <div className="landing-header__others">
                    <button onClick={e => {e.preventDefault(); props.history.push('/login')}} className='landing-header__sign-in'>SIGN IN</button>
                    {/* <button onClick={e => {e.preventDefault(); props.history.push('/register')}} className='landing-header__sign-up'>Sign up</button> */}
                </div>
            </header>
            <main>
                
            </main>
        </Fragment>
    )
})