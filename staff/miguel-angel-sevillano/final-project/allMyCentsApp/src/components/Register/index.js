import React, { useState } from 'react'
import './index.sass'



function Register({ onRegister, message, cancel }) {

    const [clearErrorMessage, setClearErrorMessage] = useState(false)

    function clear(e) {

        e.preventDefault()
        setClearErrorMessage(false)

        document.getElementById("registerForm").reset();
    }

    function handleSubmit(e) {

        setClearErrorMessage(true)

        e.preventDefault()
        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password },
        } = e.target

        onRegister(name, surname, email, password)

    }

    return <>

        <div class="register" >
            <form id="registerForm" onSubmit={handleSubmit}>
                <div id="reg" class="box">
                    <h1 id="reg">Register</h1>
                </div>
                <div class="box">
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
                            <button class="button is-danger" onClick={cancel}>Cancel</button>
                        </div>
                        <div class="control">
                            <button class="button is-primary" onClick={clear}>Clear</button>
                        </div>
                        <div>
                            {clearErrorMessage && message && <span class="tag is-warning">{message}</span>}
                        </div>
                    </div>
                </div>

            </form>

        </div>
    </>

}


export default Register