import React, { Fragment, useState } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'

export default withRouter(function Landing(props) {

    return (
        <Fragment>
            <div className='landing'>
                <header className="landing__header">
                    <div className="landing__header-logo"></div>
                    <div className="landing__header-others">
                        <button onClick={e => {e.preventDefault(); props.history.push('/login')}} className='landing__header-sign-in'>SIGN IN</button>
                        {/* <button onClick={e => {e.preventDefault(); props.history.push('/register')}} className='landing-header__sign-up'>Sign up</button> */}
                    </div>
                </header>
                <div className='landing__main'>
                    <div className='landing__main-logo'></div>
                    <p className='landing__main-txt'>EATING WITH STRANGERS MADE EASY</p>
                </div>
            </div>
            
        </Fragment>
    )
})