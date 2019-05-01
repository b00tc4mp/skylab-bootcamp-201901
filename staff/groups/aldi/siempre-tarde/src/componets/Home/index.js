import React from 'react'
import literals from './literals'

function Home({lang, onRegister, onLogin}) {
    const { title, stopByCode, stopByLine, favoriteStops} = literals[lang]

    return <section>

    <h1>{title}</h1>
    <button onClick={()=>onRegister()}>{stopByCode}</button>
    <hr></hr>
    <button onClick={()=>onLogin()}>{stopByLine}</button>
    <hr></hr>
    <button onClick={()=>onLogin()}>{favoriteStops}</button>
    <hr></hr>
    </section>

}
export default Home