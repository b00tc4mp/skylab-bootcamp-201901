import React, {useState} from 'react'
import './index.sass'
import logic from '../../logic'

function Login({}) {
    const [messageError, setMessageError] = useState(null)
    const [success, setSuccessMessage] = useState(null)

    async function handleSubmit(e) {

        e.preventDefault()
        const {
            
            email: { value: email },
            password: { value: password },

        } = e.target

    try {
        
        await logic.loginUser(email, password)
        setSuccessMessage(true)
    } catch (error) {
        setMessageError(error.message)
    }
    }

    // if(success){
    //     return(
    //         <div>
    //             <h1>Funciona</h1>
    //         </div>
    //     )
    // }

    return (
        <form onSubmit={handleSubmit}>            
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
                        Login
                    </button>
                </div>
            </div>
            <p>{messageError}</p>
        </form>
    )
}

export default Login