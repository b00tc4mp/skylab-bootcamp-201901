import React, { useState, useContext } from 'react'
//import IntroLanding from './IntroLanding'
import './index.sass'
import Feedback from '../Feedback';

import { Message } from '../Contexts'

function Register({ onRegister }) {

    const { message, setMessage } = useContext(Message);

    function handleSubmit(e) {
        e.preventDefault()

        const {
            name: { value: name },
            surname: { value: surname },
            username: { value: username },
            email: { value: email },
            password: { value: password }
        } = e.target

        onRegister(name, surname, username, email, password)
    }

    return (<>
        <section class="register_form">
            <div class="container">
                <div class="columns register_form">
                    <div class="column register_slogan">
                        Soon Make Awesome presentations!
                    </div>
                    <div class="column">
                        <form onSubmit={handleSubmit}>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Name</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="name" placeholder="Insert Name" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Surname</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="surname" placeholder="Insert Surname" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Username</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="username" placeholder="Insert Username" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Email</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="email" type="email" placeholder="Insert Email" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Password</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="password" placeholder="Insert Password" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="control">
                                <button class="button is-primary">Register</button>
                            </div>
                        </form>
                        <Feedback feedback={message} setFeedback={setMessage} />
                    </div>
                </div>
            </div>
        </section>
    </>)
}


export default Register