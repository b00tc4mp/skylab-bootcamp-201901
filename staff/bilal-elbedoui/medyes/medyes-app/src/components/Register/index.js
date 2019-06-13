import React, { Component, useState } from 'react'
import logic from '../../logic'
import styles from './index.scss';
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function Register() {
    const [messageError, setMessageError] = useState(null)
    const [response, setResponse] = useState(null)

    const handleRegister = (event) => {

        event.preventDefault()

        const {
            fullname: { value: fullname },
            email: { value: email },
            role: { value: role },
            organization: { value: organization },
            phone: { value: phone },
            position: { value: position },
            password: { value: password },
            password1: { value: password1 }

        } = event.target


        return (async () => {
            try {
                const { message } = await logic.registerUser(fullname, email, role, organization, phone, position, password, password1)
                setResponse(message)
                // window.location.href = '/'
            } catch (error) {
                setMessageError(error.message)
            }

        })()


    }


    return (
        <div className="register_body">
            <section className="register_container">
            <form onSubmit={handleRegister}>

                <h2>Create your account with MEDYES</h2>

                <div className="register_wrapper">
                <div>
                    <p className='register_field'>
                        <label>Fullname</label>
                        <input name="fullname" type="text" placeholder="Fullname" />
                    </p>

                    <p className='register_field'>
                        <label>Email Address</label>
                        <input name="email" type="email" placeholder="name@example.com" />
                    </p>

                    <p className='register_field'>
                        <label>Select your role</label>
                        <select name="role" class="">
                            <option value="normal">User</option>
                            <option value="admin">Company Representative</option>
                        </select>
                    </p>

                    <p className='register_field'>
                        <label>Organization</label>
                        <input name="organization" type="text" class="" placeholder="Introduce your organization key if the selected role is Company Representative" />
                    </p>

                    <p className='register_field'>
                        <label>Phone</label>
                        <input name="phone" type="text" class="" placeholder="Phone" />
                    </p>

                    <p className='register_field'>

                        <label>Current situation</label>
                        <select name="position" class="" >
                            <option value="student">Student</option>
                            <option value="doctor">Doctor</option>
                            <option value="planner">Event Organizer</option>
                        </select>
                    </p>

                    <p className='register_field'>
                        <label>Password</label>
                        <input name="password" type="password" placeholder="Password" />
                    </p>

                    <p className='register_field'>
                        <label>Confirm your Password</label>
                        <input name="password1" type="password" class="" placeholder="Password" />
                    </p>
                    
                    </div>
                    <div>
                        <button className="register_button">Register</button>
                    </div>
                    {
                        !!response && <div className='message-body'>
                            <p>{response}</p>
                        </div>
                    }

                    {
                        !!messageError && <div className='message-body'>
                            <p>{messageError}</p>
                        </div>
                    }
                </div>
            <div className="register_signUp">Do you already have an account? <Link to={'/'}>Login</Link></div>
            </form>
            </section>
        </div>




    )
}

export default Register
