import React from 'react'
import './index.sass'

function Landing({ onRegister, onLogin }) {

    return <div className="landing" onClick={e => e.preventDefault()}>

        <main className='landing__main'>

            <div className='landing__main-container'>

                <h1 className='landing__main-title'>FOOD<span className='landing__main-title-colored'>LAB</span></h1>
                <h2 className='landing__main-slogan'>Improvisa. Experimenta. Cocina.</h2>
                <div>
                    <a className='landing__main-button' href="" onClick={() => onRegister()}>Register</a> <span> or </span> <a className='landing__main-button' href="" onClick={() => onLogin()}>Login</a>
                </div>
            </div>


        </main>
    </div>

}

export default Landing