import React from 'react'
import literals from './literals'
import './index.sass'

function Login ({lang, onLogin, error }) {

    const {title, email, password, reset} = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const {
            username : {value: username},  
            password : {value: password}
        } = e.target

        onLogin(username, password)
    }


    return <section className='main-login'>
     <div className='login-container'>
        <h2 className='title'>{title}</h2>
        <form onSubmit= {handleSubmit}>
            <input className="input field" type="email" name="username" placeholder={email} autoFocus/>
            <input className="input field" type="password" name="password" placeholder={password}/>
            <input className="button is-rounded is-primary" type="submit" value={title}/>
            <input className="button is-rounded is-primary" type="reset" value={reset}/>
            <span className="help is-danger">{error}</span>
        </form>
        </div>
    </section>
    
}

export default Login