import React, { useState, useEffect, useContext } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Message } from '../Contexts'
import Feedback from '../Feedback';
import './index.sass'

function Login({ onLogin }) {

    const { message, setMessage } = useContext(Message);
    function handleSubmit(e) {
        e.preventDefault()

        const {
            username: { value: username },
            password: { value: password }
        } = e.target

        onLogin(username, password)
    }

    return (
        <section class="login_form">
            <div class="container">
                <div class=" register_form">
                    <div class="">
                        <form id="elementForm" class="breadcrumb is-centered" aria-label="breadcrumbs" onSubmit={handleSubmit}>
                            <div class="menu-label">
                                <div class="has-text-centered">
                                    <div class=" register_slogan login-logo">
                                        {"</DS>"}
                                    </div>
                                </div>
                            </div>
                            <div class="menu-label">
                                <div class="has-text-centered">
                                    <p class="lighttext" >Username or Email</p>
                                </div>
                                <input input class="input" name="username" placeholder="Insert Email or Username" />
                            </div>

                            <div class="menu-label">
                                <div class="has-text-centered">
                                    <p class="lighttext" >Password</p>
                                </div>
                                <input class="input" type="password" name="password" placeholder="Insert Password" required />
                            </div>
                            <button class="button is-medium is-fullwidth">
                                <div class="menu-label has-text-centered">
                                    <p class="lighttext">Login</p>
                                </div>
                            </button>
                        </form>
                        {message && <Feedback feedback={message} setFeedback={setMessage} />}
                    </div>
                </div>
            </div>
        </section>
    )
}


export default withRouter(Login)