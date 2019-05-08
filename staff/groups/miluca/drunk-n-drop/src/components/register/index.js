import React from 'react'
import './index.sass'
import { visible } from 'ansi-colors';

import Navbar from '../Navbar'

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
    return <>
    <Navbar/>
    <div class="containeRegister">
        <form onSubmit={handleSubmit}>
         <h1>Register</h1>
         <div class="field ">
             <label class="label">Name</label>
                 <div class="control">
                     <input class="input textsize" type="text" name="name" placeholder="name"/>                    
                 </div>
         </div>
         <div class="field">
             <label class="label">Email</label>
                 <div class="control">
                     <input class="input field" type="text" name="username" placeholder="email"/>
                 </div>
         </div>
         <div class="field">
             <label class="label">Password</label>
                 <div class="control">
                     <input class="input textsize" type="password" name="password" placeholder="password"/>
                 </div>
         </div>
        
         <div class="field">
         <div class="control">
             <label class="checkbox">
                 <input type="checkbox"/>
                 I agree to the <a href="#">terms and conditions</a>
             </label>
         </div>
       </div>
         <div class="field is-grouped">
             <div class="control">
                 <button class="button is-link">Register</button>
             </div>      
             <div class="control">
                 <button class="button is-text butcancel">Cancel</button>
             </div>
         </div>
         </form>
         <p class="error">{error}</p>
        </div>
    </>
 }

export default Register