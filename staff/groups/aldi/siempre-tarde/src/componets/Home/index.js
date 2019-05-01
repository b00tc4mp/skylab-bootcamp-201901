import React from 'react'
import literals from './literals'

function Home({lang, onStopCode, onLineCode,onFavorites, onLogout}) {
    const { title, stopByCode, stopByLine, favoriteStops, logout} = literals[lang]

    return <section>

    <h1>{title}</h1>
    <button onClick={()=>onStopCode()}>{stopByCode}</button>
    <hr></hr>
    <button onClick={()=>onLineCode()}>{stopByLine}</button>
    <hr></hr>
    <button onClick={()=>onFavorites()}>{favoriteStops}</button>
    <hr></hr>
    <button onClick={()=>onLogout()}>{logout}</button>
    </section>

}
export default Home