import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import backgroundImg from '../../img/register-image.png'

function Register({ onRegister }) {

    function handleRegister(event) {

        event.preventDefault()

        const name = event.target.name.value
        const username = event.target.username.value
        const email = event.target.email.value
        const emailConfirm = event.target.emailConfirm.value
        const password = event.target.password.value
        const passwordConfirm = event.target.passwordConfirm.value
        
        onRegister(name, username, email, emailConfirm, password, passwordConfirm)  
    }

    return (

        <section className="register">
        
            <header className="register__header" style={{ backgroundImage: `url("${backgroundImg}")`}} >
                <Link to="/" className="register__header__icon">
                    <FontAwesomeIcon icon="home" />
                </Link>
                <h1>Live the unique experience</h1>
                <p>Find the best congress in your city. Share your artists from mambo, salsa, bachata with the community.</p>
            </header>

            <div>
                <div className="register__letter">
                    <h1>Join free</h1>
                    <p>Already have an account? 
                        <a href="#"> Join</a>
                    </p> 
                </div>

                    <form className="register__form" onSubmit={handleRegister}>
                        
                        <fieldset>
                        <label for="name">name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                            />
                        </fieldset>

                        <fieldset>
                        <label for="username">username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                required
                            />
                        </fieldset>

                        <fieldset>
                            <label for="email">email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                />
                        </fieldset>

                        <fieldset>
                            <label for="emailConfirm">Email Confirmation</label>
                                <input
                                    type="text"
                                    name="emailConfirm"
                                    id="emailConfirm"
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

                        <fieldset>
                            <label for="passwordConfirm">Password Confirmation</label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    required
                                />
                        </fieldset>

                        <button type="submit">Register</button>

                    </form>

                    <p>By joining, you agree to the 
                        <a href="#">  Terms </a>
                        and
                        <a href="#"> Privacy Policy.</a>
                    </p> 
            </div>
        </section>
    )   
}

export default Register