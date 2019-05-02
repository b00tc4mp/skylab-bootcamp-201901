import React from 'react'
import literals from './literals'
import './index.sass'

function Landing({ lang, onRegister, onLogin }) {
    const { welcome, register, or, login } = literals[lang]

    return <div className='block'>
    <section className='hero is-danger'>
        <div className='hero-body'>
            <h1 className='title'>{welcome}</h1>
        </div>
    </section>
        <div className='columns is-mobile'>
            <div className='column is-4 is-offset-one-quarter'>
                <div className='block'>
                    <button className='button is-danger is-rounded is-outlined' onClick={() => onRegister()}>{register}</button>
                </div>
                <div className='block'>
                    <p>{or}</p>
                </div>
                <div className='block'>
                    <button className='button is-danger is-rounded is-outlined' onClick={() => onLogin()}>{login}</button>
                </div>
            </div>
        </div>
    </div>

}
export default Landing