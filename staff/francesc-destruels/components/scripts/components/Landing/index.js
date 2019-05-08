import React from 'react'
import literals from './literals'
import './index.sass'

function Landing({ lang, onRegister, onLogin }) {
    const { register, or, login } = literals[lang]

    return <section className="landing" onClick={e => e.preventDefault()}>
        <a href="" onClick={() => onRegister()}>{register}</a> <span>{or}</span> <a href="" onClick={() => onLogin()}>{login}</a>.
        </section>
}

export default Landing