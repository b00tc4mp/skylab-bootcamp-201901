import React from 'react'




function Login({onLogin,error,togglelogin}){
   
    function handleSubmit(e){
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username , password)
    }

    return <>
    
    <form onSubmit={handleSubmit}>
    <div class="modal is-active " >
    <div class="modal-background"></div>
    <div class="modal-card"> 
        <header class="modal-card-head has-background-black">        
            <button onClick={() => togglelogin()} class="delete" aria-label="close"></button>            
        </header>
        <section class="modal-card-body has-background-black">              
        <div class="field">
            <label class="label">Email</label>
                <div class="control">
                    <input class="input field" type="text" name= "username" placeholder="email"/>
                </div>
        </div>
        <div class="field">
            <label class="label">Password</label>
                <div class="control">
                    <input class="input field" type="password" name ="password" placeholder="password"/>
                </div>
            <p class="has-text-white">{error}</p>
        </div>  
        </section>
        <footer class="modal-card-foot has-background-black">
            <button class="button is-success" >Login</button>
        </footer>
            
    </div>
    </div>
    </form>
    
    </>
}


export default Login