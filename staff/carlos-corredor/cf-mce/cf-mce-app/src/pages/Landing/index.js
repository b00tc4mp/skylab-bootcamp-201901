import React, { useState, useEffect } from 'react';
import Login from '../../components/Login'
import RegisterUser from '../../components/Register-user'
import './index.sass'
import Space3 from '../../components/Space-3';
import Space4 from '../../components/Space-4';


function Landing({ handleRegister, error, toLogin, handleLogin, resetError }) {
    
    const [login, setLogin ] = useState(true)
    const [register, setRegister ] = useState(false)

    // const handleRegisterShow = () => { 
    //     if(login === true) {
    //         setLogin(false)
    //         setRegister(true) 
    //     } else {
    //         setLogin(true)
    //         setRegister(false) 
    //     }

    // }

    useEffect( () => {
        if(toLogin) handleLoginShow ()
      }, [toLogin])
    

    const handleRegisterShow = () => { 
        setLogin(false)
        setRegister(true)
        resetError()
    }
    
    const handleLoginShow = () => { 
        setLogin(true)
        setRegister(false)
        resetError()
    }

    return (
       
<section className='landing'> 
    {/* <h1>Landing</h1> */}
    <Space3 />
    <div class="form-row">
        <div class="form-group col-md-1"></div>
        <div class="form-group col-md-5">
            <h1>Flow Control of Electronic Control Modules</h1>
        </div>
        <div class="form-group col-md-3"></div>
        <div class="form-group col-md-1"><img src="memory-rom.png" width="100" height="100" alt="chip"></img></div>
    </div>
    { toLogin && !register && <h2>Register is ok</h2>}
    { login && <Login handleLogin={handleLogin} error={error}/>}
    { register && <RegisterUser handleRegister={handleRegister} error={error}/> }
    <Space4 />
    <div class="form-row">
        <div class="form-group col-md-1"></div>
        <div class="form-group col-md-5">
            { login && <button class="btn btn-light" onClick={handleRegisterShow} >Register</button> }
            { register && <button class="btn btn-light" onClick={handleLoginShow} >Login</button> }
        </div>
    </div>
    
    
</section>
       

    )
}

export default Landing
