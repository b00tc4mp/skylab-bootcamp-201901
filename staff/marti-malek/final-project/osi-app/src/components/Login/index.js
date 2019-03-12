import React, { useState } from 'react'
import Hammer from 'hammerjs'
import './index.sass'

function Login({ handleEmailInput, handlePasswordInput, handleFormSubmit, onLogin, goToRegister, wheelHandler, MouseWheelHandler }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let deltaY = 0
    let deltaX = 0

    /* TO BE CONTINUED */
    // var hammertime = new Hammer(window);
    // hammertime.on('pan-y', function (ev) {
    //     debugger
    //     console.log(ev);
    // });

    handleEmailInput = e => setEmail(e.target.value)
    handlePasswordInput = e => setPassword(e.target.value)

    handleFormSubmit = event => {
        event.preventDefault()

        onLogin(email, password)
    }

    window.onwheel = e => {
        if (Math.sign(e.deltaY)) deltaY++
        if (Math.sign(e.deltaX)) deltaX++

        if (deltaX % 4 === 0 || deltaY % 4 === 0) wheelHandler(e)
        // wheelHandler(e)
    }

    wheelHandler = e => {
        // once = true
        if (e.deltaX) {
            if (e.preventDefault) e.preventDefault()
            if (e.stopPropagation) e.stopPropagation()
            e.cancelBubble = true
            e.returnValue = false
            goToRegister()
        } else if (e.deltaY) {
            if (e.preventDefault) e.preventDefault()
            if (e.stopPropagation) e.stopPropagation()
            e.cancelBubble = true
            e.returnValue = false
            goToRegister()
        }
    }



    return <section className="login">
        {/* <div className="login__image"></div> */}
        <form className="login__form" onSubmit={handleFormSubmit}>
            <div>
                <input onChange={handleEmailInput} className="login__name" name="email" type="email" required></input>
                <label>Email</label>
            </div>
            <div>
                <input onChange={handlePasswordInput} className="login__password" name="password" type="password" required></input>
                <label>Password</label>
            </div>
            <button className="login__button">Login</button>
        </form>
    </section>
}

export default Login
