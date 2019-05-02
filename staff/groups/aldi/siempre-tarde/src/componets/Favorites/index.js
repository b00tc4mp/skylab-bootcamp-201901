import React from 'react'
import literals from './literals'
import { Route, withRouter, Redirect, Switch, Link } from 'react-router-dom'

function Favorites({ lang, favs, error, onFavOut}) {

    const { title1, back, fav } = literals[lang]

    return <section>
    <Link to={`/`}><button>{back}</button></Link>
        <h2>{title1}</h2>
        <ul>
            {
                favs.map(({ stop_id, stop_name }) => {
                    return <li key={stop_id}>
                        <h2>{stop_id} - {stop_name}</h2>
                        <button onClick={()=>onFavOut(stop_id)}>{fav}</button>
                    </li>
                })
            }
        </ul>
        <h2>{error}</h2>

    </section>
}

export default Favorites