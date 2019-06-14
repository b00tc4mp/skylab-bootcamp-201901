import React from 'react'
import './index.sass'
import Title1 from '../Title-1'
import Errors from '../Errors'
import Space2 from '../Space-2';

function Login ({handleLogin, error}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const email = e.target.email.value
        const password = e.target.password.value

        handleLogin(email, password)
    }

    return (
        <section className='login'>
            {/* <h1>Login</h1> */}
            <Space2 />
            <div class="form-row">
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-5"><Title1 title1='Login'/></div>
            </div>
            {/* <Space3 /> */}
            
            <form onSubmit={handleSubmit}>

                <div class="form-row">

                    <div class="form-group col-md-1"></div>
                    
                    <div class="form-group col-md-5">
                        <label for="inputEmail">Email</label>
                        <input type="email" name="email" class="form-control" id="inputEmail" placeholder="ej. perezm@mail.com"/>
                    </div>

                    <div class="form-group col-md-5">
                        <label for="inputPassword4">Password</label>
                        <input type="password" name="password" class="form-control" id="inputPassword4" placeholder=""/>
                    </div>
                                        
                </div>
                <div class="form-row">
                    <div class="form-group col-md-1"></div>
                    <div class="form-group col-md-1"><button type="submit" class="btn btn-light">Siguiente</button></div>
                    <div class="form-group col-md-1"><Errors message={error}/><span></span></div>
                </div>
            </form>
        </section>
    )
}

export default Login