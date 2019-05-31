import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import literals from './literals'

//import './index.sass'

function Landing({ onRegister, onLogin }) {

    const { userLanguage } = useContext(AppContext)

    //const { title, register, login } = literals[userLanguage]
    const { title, register, login } = literals['en']
    

    return <main className='landing' onClick={e => e.preventDefault()}>
        <h1 className='landing__title'>{title}</h1>

        <section className='landing__buttons'>
            <button className='landing__button' onClick={() => onRegister()}>{register}</button>
            <button className='landing__button' onClick={() => onLogin()}>{login}</button>
        </section>

    </main>
}

export default Landing