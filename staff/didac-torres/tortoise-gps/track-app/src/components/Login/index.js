import React from 'react'
import './index.sass'

function Login({ onLogin, onBack }) {


    function handleSubmit(e) {
        e.preventDefault()

        const {
            username: { value: username },
            password: { value: password }
        } = e.target

        onLogin(username, password)
    }


    return <section className='main-login'>
        <div className='login-container'>
           <button className="button-back button is-rounded is-warning is-outlined" onClick={() => onBack()}>BACK</button>
            <h2 className='login-title title'>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div className='login-columns columns is-8 is-2-offset is-desktop'>
                    <div className='login-column column is-half is-desktop'>
                        <input className="input field is-rounded is-warning" type="email" name="username" placeholder="email" autoFocus required/>
                    </div>
                    <div className='login-column column is-half is-desktop'>
                        <input className="input field is-rounded is-warning" type="password" name="password" placeholder="password" required/>
                    </div>
                    </div>
                    <input className="button-login button is-rounded is-warning" type="submit" value="LOGIN" />
                    <input className="button-login button is-rounded is-warning" type="reset" value="RESET" />
            </form>
        </div>
    </section>

}

export default Login