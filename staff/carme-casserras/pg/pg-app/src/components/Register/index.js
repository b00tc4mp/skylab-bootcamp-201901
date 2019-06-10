import React, { useState } from 'react';
import './index.sass'
import logic from '../../logic';

function Register(props) {

    const [messageError, setMessageError] = useState(null)

    const { match: { params: { login } } } = props

    async function handleSubmit(e) {

        e.preventDefault()

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },

        } = e.target
        try {

            await logic.registerUser(name, email, password)
            props.history.push('/login')
            
        } catch (error) {
            setMessageError(error.message)
        }
    }
    
    return (

        < form className="contens" onSubmit={handleSubmit} >
            <div className='field'>
                <label className='label'>REGISTER</label>
                <div className='control'>
                    <div class="control has-icons-left has-icons-right">
                        <input className='input' name='name' type='text' placeholder='Name' />
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control has-icons-left has-icons-right">
                    <input className="input" name='email' type="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <div className="control has-icons-left">
                    <input className="input" name='password' type="password" placeholder="Password" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-success">
                        Register
                 </button>
                </div>
            </div>
            {messageError && <div className="message-error">
                <label>{messageError}</label>
            </div>}
        </form >
        )
}

export default Register


