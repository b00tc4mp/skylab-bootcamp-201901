import React from 'react'
import literals from './literals'
import './index.sass'

function Home({lang, onStopCode, onLineCode,onFavorites, onLogout}) {
    const { title, stopByCode, stopByLine, favoriteStops, logout} = literals[lang]

    return <section className="main-home">
       <section className='buttons-landing buttons is-10-desktop is-10-tablet is-10-mobile is-offset-one-quarter'>
            <h1 className="home-title">{title}</h1>
            <button className='button-landing button is-primary is-large is-rounded'  onClick={()=>onStopCode()}>{stopByCode}</button>
            <hr></hr>
            <button className='button-landing button is-primary is-large is-rounded'  onClick={()=>onLineCode()}>{stopByLine}</button>
            <hr></hr>
            <button className='button-landing button is-primary is-large is-rounded'  onClick={()=>onFavorites()}>{favoriteStops}</button>
            <hr></hr>
            <button className='button-landing button is-primary is-large is-rounded'  onClick={()=>onLogout()}>{logout}</button>
        </section>
    </section>

}
export default Home