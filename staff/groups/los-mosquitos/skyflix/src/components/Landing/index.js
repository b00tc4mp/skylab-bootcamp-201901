import React from 'react'
import literals from './literals'

function Landing({ lang, onLogin, onRegister}) {
    const { title, text, register, login } = literals[lang] //cambiar por lang cuando tengamos el LanguageSelector
    
    return <section class="" onClick={e => e.preventDefault()}>
        <img src="" alt="Logo Skyflix"/>
        <a href="" onClick={() => onLogin()}>{login}</a>
        <header>
            <h1>{title}</h1>
            <p>{text}</p>
            <a href="" onClick={() => onRegister()}>{register}</a>
        </header>
    </section>
}

export default Landing