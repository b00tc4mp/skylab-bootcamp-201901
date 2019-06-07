import React, { useState, useEffect,useContext } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Message } from '../Contexts'
import Feedback from '../Feedback';

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
                    <div class=" register_slogan">
                        [DEVSLIDES]
                    </div>
                    <div class="">
                        <form onSubmit={handleSubmit}>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Username or Email</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="username" placeholder="Insert Email or Username" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Password</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="password" placeholder="Insert Password" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="control">
                                <button class="button is-primary">Login</button>
                            </div>
                        </form>
                        {message && <Feedback feedback={message} setFeedback={setMessage} />}
                    </div>
                </div>
            </div>
        </section>
    )
}


export default withRouter(Login)