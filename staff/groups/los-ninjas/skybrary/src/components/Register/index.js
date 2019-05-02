import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.scss'

function Register({ onRegister, error }) {

    function handleSubmit(event){
        event.preventDefault()

        const {
            alias: {value: alias},
            username: {value: username},
            password: {value: password}
        } = event.target

        onRegister(alias, username, password)
    }

    return (
        <section className="section register">
            <Header/>
            <div className="section">
                <h2 className="subtitle has-text-centered">Register</h2>
                <form className="columns is-multiline" onSubmit={handleSubmit}>
                    <div className="column is-10 is-offset-1">
                        <div className="columns is-multiline">
                            <input className="column is-4 is-10-mobile is-offset-1-mobile" type="text" name="alias" placeholder="Alias" />
                            <input className="column is-4 is-10-mobile is-offset-1-mobile" type="text" name="username" placeholder="Email" />
                            <input className="column is-4 is-10-mobile is-offset-1-mobile" type="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <p className="column is-2 is-offset-5 has-text-centered">
                        <button className="button is-medium is-link is-inverted">Send</button>
                    </p>
                    {error && <article className="column is-12  message is-danger register__error">
                        <div className="message-body">
                            {error}
                        </div>
                    </article>}
                </form>
            </div>
            <Footer />
        </section>
    )
}

export default Register