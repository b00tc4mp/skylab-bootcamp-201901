import React from 'react'
import {Link} from 'react-router-dom'

function RedirectLoginOrRegister(){
    return(
        <section>
            <h2>log in or register</h2>
            <p>if you want to consult or join an event login
               or if you have an account register for free</p>
            <Link to="/login"> Login </Link>

            <Link to="/register"> Register </Link>
        </section>
    )
} 

export default RedirectLoginOrRegister