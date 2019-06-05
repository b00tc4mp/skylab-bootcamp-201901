import React from 'react'
import './index.sass'
import logic from '../../logic'

function Login({ onLogin, error}) {

    async function handleSubmit(e) {

        e.preventDefault()
        const {
            
            email: { value: email },
            password: { value: password },

        } = e.target

        await logic.loginUser(email, password)
    }

    return (
        <form onSubmit={handleSubmit}>            
            <div className="field">
                <div className="control has-icons-left has-icons-right">
                    <input className="input" name='email' type="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <div className="control has-icons-left">
                    <input className="input" name='password' type="password" placeholder="Password" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-success">
                        Login
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Login