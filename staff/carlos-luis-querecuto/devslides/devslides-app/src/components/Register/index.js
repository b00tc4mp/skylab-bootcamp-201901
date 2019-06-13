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
                        Make Awesome presentations with your coding Skills!
                    </div>
                    <div class="column">
                        <form onSubmit={handleSubmit}>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label boldtext">Name</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="name" placeholder="Insert Name" required/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label boldtext">Surname</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="surname" placeholder="Insert Surname" required/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label boldtext">Username</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="username" placeholder="Insert Username" required/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label boldtext">Email</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="email" type="email" placeholder="Insert Email" required/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label boldtext">Password</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" name="password" type="password" placeholder="Insert Password" required/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button class="button is-medium is-fullwidth">
                                <div class="menu-label has-text-centered">
                                    <p class="lighttext ">Register</p>
                                </div>
                            </button>
                        </form>
                        <Feedback feedback={message} setFeedback={setMessage} />
                    </div>
                </div>
            </div>
        </section>
    </>)
}


export default Register