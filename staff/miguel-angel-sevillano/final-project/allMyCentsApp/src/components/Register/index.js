import React, { useState } from 'react'


function Register({ onRegister, message, cancel, clear }) {



    function clear() {
        document.getElementById("registerForm").reset();
    }

    function handleSubmit(e) {
        e.preventDefault()
        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password },
        } = e.target

        onRegister(name, surname, email, password)

    }

    return <div class="containeRegister">
        <form id="registerForm" onSubmit={handleSubmit}>
            <h1>Register</h1>
            
            <div class="field ">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input textsize" type="text" name="name" placeholder="name" />
                </div>
            </div>
            <div class="field">
                <label class="label">Surname</label>
                <div class="control">
                    <input class="input field" type="text" name="surname" placeholder="surname" />
                </div>
            </div>
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
                    <button class="button is-link">Register</button>
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


export default Register