import React from 'react'
import './index.scss'

function Register({ onRegister, onLogin ,error }) {

    function handleSubmit(e) {

        e.preventDefault()

        const {
            name: { value: name },
            surname: { value: surname },
            phone: { value: phone },
            email: { value: email },
            password: { value: password }
        } = e.target

        onRegister(name, surname, phone, email, password)
    }

    return <>
        <section className='register'>
            <h2>Crea una cuenta</h2>
            <form onSubmit={handleSubmit}>

                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="text" name='name' placeholder="Nombre" required />
                    </p>
                </div>

                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="text" name='surname' placeholder="Apellido" required />
                    </p>
                </div>

                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="text" name='phone' placeholder="Teléfono" required />
                    </p>
                </div>

                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" name='email' placeholder="Email" required />
                    </p>
                </div>

                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="password" name='password' placeholder="Contraseña" required />
                    </p>
                </div>

                <button className='button is-fullwidth'>Crear</button>
                <span>{error}</span>

                <section className='' onClick={e => e.preventDefault()}>
                    <a href='' onClick={() => onLogin()} >¿Ya tienes cuenta? Inicia sesión.</a>
                </section>
            </form>
        </section>

    </>

}

export default Register