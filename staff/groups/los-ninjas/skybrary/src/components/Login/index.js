import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.scss'

function Login({onLogin, error}){
    function handleSubmit(event) {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        onLogin(username, password)
    }

    return (
        <section className="section login">
            <Header/>
            <div className="section">
                <h2 className="subtitle has-text-centered">Login</h2>

                <form  className="columns is-multiline" onSubmit={handleSubmit}>
                    <input className="column is-6 is-four-fifths-mobile is-offset-1-mobile" type="text" name="username" placeholder="Email" />
                    <input className="column is-6 is-four-fifths-mobile is-offset-1-mobile" type="password" name="password" placeholder="Password" />
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

export default Login