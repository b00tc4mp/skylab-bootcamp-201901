import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import './index.css'

function RedirectLoginOrRegister(){
    return(
        <section className="user">
            <div className="user__info">
            <h2 className="user__info-title"> Login or Register </h2>
            <p className="user__info-paragraph">to see events log in or register?</p>

            <div className="button">

            {/* <div className="user__info-button-log">
                <button className="user__info-button-log-login"
                    onClick={() =>
                    this.props.history.push('/login')}>Login
                </button> 
            </div>
            
            <div className="user__info-button-log">
                <button className="user__info-button-log-register"
                    onClick={() =>
                    this.props.history.push('/register')}>Register
                </button> 
            </div> */}
            <div className="button__login">
                <Link className="button__login-link" to="/login">Login</Link>
            </div>

            <div className="button__register">
                <Link className="button__register-link" to="/login">Register</Link>
            </div>


            </div>


            </div>
        </section>
    )
} 

export default withRouter(RedirectLoginOrRegister) 