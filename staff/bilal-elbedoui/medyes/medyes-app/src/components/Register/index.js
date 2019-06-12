import React, { useState } from 'react'
import logic from '../../logic'
import styles from './index.css';
import { Link } from 'react-router-dom'

function Register() {
    const [messageError, setMessageError] = useState(null)
    const [response, setResponse]= useState(null)

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

        
            return(async()=>{
                try{
                    const {message} = await logic.registerUser(fullname, email, role, organization, phone, position, password, password1)
                    setResponse(message)
                    // window.location.href = '/'
                } catch (error) {
                    setMessageError(error.message)
                }
                
            })()
        

    }


    return (
        <div className="body">
            <section className='container'>
                <h1 className="brand">Create Your Account, Be part of <span>MEDYES</span></h1>

                <div className="wrapper">
                    <div className="company-info">
                        <h3>Action web design</h3>
                        <ul>
                            <li>Email</li>
                            <li>555-555-555</li>
                            <li>testRegister</li>
                        </ul>
                    </div>
                <div className="register">
                    <form onSubmit={handleRegister} className="form">
                        <p className='field'>
                            <label>Fullname</label>
                            <input name="fullname" type="text" placeholder="fullname" />
                        </p>

                        <p className='field'>
                            <label>Email Address</label>
                            <input name="email" type="email" placeholder="name@example.com" />
                        </p>

                        <p className='field'>
                            <label>Select your role</label>
                            <select name="role" class="">
                                <option value="normal">User</option>
                                <option value="admin">Company Representative</option>
                            </select>
                        </p>

                        <p className='field'>
                            <label>Organization</label>
                            <input name="organization" type="text" class="" placeholder="key" />
                            <small id="emailHelp" class="form-text text-muted">Introduce your organization key if the selected role is Company Representative</small>
                        </p>

                        <p className='field'>
                            <label>Phone</label>
                            <input name="phone" type="text" class="" placeholder="phone" />
                        </p>

                        <p className='field'>

                            <label>Current situation</label>
                            <select name="position" class="" >
                                <option value="student">Student</option>
                                <option value="doctor">Doctor</option>
                                <option value="planner">Event Organizer</option>
                            </select>
                        </p>

                        <p className='field'>
                            <label>Password</label>
                            <input name="password" type="password" placeholder="Password" />
                        </p>

                        <p className='field'>
                            <label>Confirm your Password</label>
                            <input name="password1" type="password" class="" placeholder="Password" />
                        </p>
                        <p>
                            <button>Register</button>
                        </p>
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
                    </form>
                </div>
                <p className="toLogin">Do you already have an account? <Link to={'/'}>Login</Link></p>
                </div>
            </section>
        </div>




    )
}

export default Register
