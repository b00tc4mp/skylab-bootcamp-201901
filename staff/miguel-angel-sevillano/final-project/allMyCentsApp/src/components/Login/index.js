import React from 'react'


function Login({ onLogin, message, cancel, clear }) {



    function clear() {
        document.getElementById("loginForm").reset();
    }

    function handleSubmit(e) {
        e.preventDefault()
        const {
            email: { value: email },
            password: { value: password },
        } = e.target

        onLogin(email, password)

    }

    return <div class="containeRegister">
        <form id="loginForm" onSubmit={handleSubmit}>
            <h1>Login</h1>
     
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
                    <button class="button is-text butcancel" onClick={cancel}>Cancel</button>
                </div>
                <div class="control">
                    <button class="button is-text butcancel" onClick={clear}>Clear</button>
                </div>
            </div>
            {message && <span class="tag is-warning">{message}</span>}
        </form>

    </div>




}


export default Login