import React from 'react'
import './index.scss'

function Login({ onLogin, onRegister, error }) {

    function handleSubmit(e) {
        e.preventDefault()

        const {
            email: { value: email },
            password: { value: password }
        } = e.target

        onLogin(email, password)

    }

    return <>
        <section className='login'>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit} >
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" name='email' placeholder="Email" required />
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" name='password' placeholder="Contraseña" required />

                    </p>
                </div>
                <span>{error}</span>
                <button className='button is-fullwidth'>Iniciar sesión</button>
            </form>
            <section className='' onClick={e => e.preventDefault()}>
                <a href='' onClick={() => onRegister()} >¿No tienes cuenta? Crea una aquí</a>
            </section>
        </section>
    </>
}

export default Login