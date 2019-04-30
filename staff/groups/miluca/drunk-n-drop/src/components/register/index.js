import React from 'react'

function Register({onRegister, error}) {

    function handleSubmit(e) {
        e.preventDefault()
        const {
            name: {value: name},
            username: {value: username},    
            password: {value: password}, 
        } = e.target

        onRegister(name, username, password)
    }   
        
    return <section className='Register'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name"/>
        <input type="text" name="username" placeholder="email"/>
        <input type="password" name="password" placeholder="password"/>
        <button>Register</button>
        <span>{error}</span>
        </form>
    </section>

}

export default Register