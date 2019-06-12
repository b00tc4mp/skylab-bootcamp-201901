import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './index.css';
import logic from '../../logic'


export function Login({ history }) {
    const [messageError, setMessageError] = useState(null)

    const handleHome = (event) => {

        event.preventDefault()
        const {
            email: { value: email },
            password: { value: password },
        } = event.target

        return (async()=>{
            try{
                debugger
                await logic.login(email, password)
                debugger
                history.push('/home')
            }catch({message}){
                debugger
                setMessageError(message)
            }
        })()
            
    }

    return (
        <div className="body">

            <div className="container">
                <h1 className="brand"> To stay informed about all Medical Events!<span>MEDYES</span></h1>

                <div className="wrapper">
                    <div className='login'>

                        <form onSubmit={handleHome}>
                            <p className='field'>
                                <label>Email Address</label>
                                <input name="email" type="email" placeholder="name@example.com" />
                            </p>

                            <p className='field'>
                                <label>Password</label>
                                <input name="password" type="password" placeholder="Password" />
                            </p>
                            <button>Log In</button>
                            {
                                messageError && <div className='message-body'>
                                    <p>{messageError}</p>
                                </div>
                            }
                        </form>
                        <p>Do you have an account? <Link to={'/register'}>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
