import React, { useState } from 'react'

export default function Login () {

    const [email, setEmail]= useState(null)
    const [password, setPassword]= useState(null)

    const handleFormSubmit = event => {
        event.preventDefault()
        alert(`Email: ${email}, Password:${password}`)
    }
        
    return (
        <section className="login" >
            <div className="columns is-mobile is-centered">
                <div className="column">
                    <form className="login__form" onSubmit={handleFormSubmit}>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input is-small is-rounded" type="email" name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input is-small is-rounded" type="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div>
                        </div>
                        <p className="control"><button className="button is-outlined is-danger is-small is-rounded" type="submit">Log In</button></p>
                    </form>
                </div>
            </div> 
        </section> 
    )
}
