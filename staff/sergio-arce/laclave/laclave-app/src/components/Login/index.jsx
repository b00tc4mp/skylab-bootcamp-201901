import React from 'react'

function Login({ onLogin }) {

    function handleSubmit(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value
        
        onLogin(email, password)
    }

    return (
        <section className="login">

            <h1>Login</h1>
            <p>Welcome back</p>

            <form onSubmit={handleSubmit} className="login__form">
                 <fieldset>
                    <label for="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                
                    />
                </fieldset>

                <fieldset>
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                    />
                 </fieldset>
                <button>Login</button>
            </form>
                <p>Don't have an acount? 
                    <a href="#register"> Join</a>
                </p>    
        </section>
    )
}

export default Login