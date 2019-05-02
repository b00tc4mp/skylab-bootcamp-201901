import React from 'react'
import literals from './literals'
import './index.sass'

function Landing({ lang, onRegister, onLogin }) {
    const { welcome, register, or, login } = literals[lang]

    return <main className='main-landing'>
        
        <section className='heroTitle'>
            <h1>{welcome}</h1>
        </section>

        <section className='buttons-landing buttons is-10-desktop is-10-tablet is-10-mobile is-offset-one-quarter'>
            <button className='button-landing button is-primary is-large is-rounded' onClick={() => onRegister()}>{register}</button>
            <button className='button-landing button is-primary is-large is-rounded' onClick={() => onLogin()}>{login}</button>
        </section>


    </main>

}
export default Landing