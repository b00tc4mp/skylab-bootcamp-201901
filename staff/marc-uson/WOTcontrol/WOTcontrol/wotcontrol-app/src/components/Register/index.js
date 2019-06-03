import React, { useContext }  from 'react'
import { Context } from '../Context'
import Toast from '../Toast'
import './index.sass'

function Register(){
    const { error, setError } = useContext(Context)

    function handleSubmit(e) {
        e.preventDefault()

        // const {
        //     name: { value: name },
        //     surname: { value: surname },
        //     username: { value: username },
        //     password: { value: password },
        // } = e.target

        // onRegister(name, surname, username, password, city)
    }
    return <main className="mainregister">
        <section className="column is-6-desktop is-6-tablet is-10-mobile is-one-fifth">
            <div className="has-text-centered field">
                <h2 className="title is-2">Weatunes</h2>
                <p className="subtitle"> Sign up with your email address</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input className="input field" type="text" name="name" placeholder="name"/>
                <input className="input field" type="text" name="surname" placeholder="surname"/>
                <input className="input field" type="text" name="username" placeholder="email"/>
                <input className="input field" type="password" name="password" placeholder="password" />
                <button className="button is-fullwidth is-primary">Sign Up</button>
            </form>
            {error && <Toast error={error} />}
        </section>
    </main>

}
export default Register