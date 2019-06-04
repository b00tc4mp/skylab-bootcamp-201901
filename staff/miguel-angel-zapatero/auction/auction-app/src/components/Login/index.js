import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login({onLogin}) {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    
    function handleSubmit(e) {
        e.preventDefault()
        onLogin(email, password)
    }

    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder="email" required onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="password" required onChange={e => setPassword(e.target.value)}/>
            <button>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
    </>
}

export default Login