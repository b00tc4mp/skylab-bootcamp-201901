import React, { useState } from 'react'
import './index.sass'


function Login({ onLogin, message, cancel, clear }) {

    const [clearErrorMessage, setClearErrorMessage] = useState(false)


    function clear(e) {
        e.preventDefault()
        setClearErrorMessage(false)
        document.getElementById("loginForm").reset();

    }

    function handleSubmit(e) {
        setClearErrorMessage(true)
        e.preventDefault()
        const {
            email: { value: email },
            password: { value: password },
        } = e.target

        onLogin(email, password)

    }

    return <form id="loginForm" onSubmit={handleSubmit}>
            <div class="box">
                <h1>Login</h1>
            </div>

            <div class="box">
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input field" type="text" name="email" placeholder="email" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input textsize" type="password" name="password" placeholder="password" />
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link">Login</button>
                    </div>
                    <div class="control">
                        <button class="button is-danger" onClick={cancel}>Cancel</button>
                    </div>
                    <div class="control">
                        <button class="button is-primary" onClick={clear}>Clear</button>
                    </div>
                    <div class="control">
                        {clearErrorMessage && message && <span class="tag is-warning">{message}</span>}
                    </div>
                </div>
            </div>

        </form>

 




}


export default Login