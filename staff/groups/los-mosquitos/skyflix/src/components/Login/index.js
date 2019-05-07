import React from 'react'
import literals from './literals'
import './index.sass'

function Login({ lang, onLogin, error }) {
    const { title, email, password } = literals[lang]
    function handleSubmit(event) {

        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        onLogin(username, password)
    }

    return <>
        <div className="bg-container" />
        <section>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <input type='text' className="form-control" id="formGroupExampleInput" name='username' placeholder={email} />
                    <input type='password' className=" login form-control" id="formGroupExampleInput2" name='password' placeholder={password} />
                    <button className=" login btn btn-primary btn-lg btn-block">{title}</button>
                </div>
            </form>
            {error && <span className="error alert alert-info">{error}</span>}

        </section>
    </>
}

export default Login