import React from 'react'



function Login({onLogin,error}){

    function handleSubmit(e){
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username , password)
    }

    return <section className ="login">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name= "username" placeholder= "Username"/>
            <input type="password" name ="password" placeholder = "Password"/>
            <button>Login</button>
            <span>{error}</span>
        </form>
    
    </section>
}


export default Login