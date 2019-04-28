import React from 'react'
import literals from './literals'

function Landing({lang, onRegister, onLogin}) {
    const { welcome, register, or, login} = literals[lang]

    return <section>

    <h1>{welcome}</h1>
    <button onClick={()=>onRegister()}>{register}</button>
    <p>{or}</p>
    <button onClick={()=>onLogin()}>{login}</button>

    </section>

}
export default Landing