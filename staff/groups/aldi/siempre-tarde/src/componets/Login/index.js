import React from 'react'
import literals from './literals'

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


    return <section>
        <h2>{title}</h2>
        <form onSubmit= {handleSubmit}>
            <input type="email" name="username" placeholder={email} autoFocus/>
            <input type="password" name="password" placeholder={password}/>
            <input type="submit" value={title}/>
            <input type="reset" value={reset}/>
            <span>{error}</span>
        </form>
    </section>
    
}

export default Login