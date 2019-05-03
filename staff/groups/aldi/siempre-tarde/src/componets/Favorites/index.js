import React from 'react'
import literals from './literals'
import { Route, withRouter, Redirect, Switch, Link } from 'react-router-dom'
import './index.sass'
import emoji from 'react-easy-emoji'

function Favorites({ lang, favs, error, onFavOut, onSee }) {

    const { title1, back, fav, see } = literals[lang]

    return <section className='main-results'>
        <div className='results-container'>
            <Link to={`/`}><button className="button is-rounded is-primary is-outlined">{back}</button></Link>
            <h2 className="title is-4 has-text-centered">{title1}</h2>
            <ul className="container">
                {
                    favs.map(({ stop_id, stop_name }) => {
                        return <li className="columns is-mobile is-centered is-multiline" key={stop_id}>
                            <div className="column is-12-mobile">
                                <h2><span>{ emoji(' 📍') }</span>{stop_id} - {stop_name}</h2>
                            </div>
                            <div className="column is-12-mobile">
                                <button className="button is-rounded is-primary" onClick={() => onFavOut(stop_id)}>{fav}</button>
                                <button className="button is-rounded is-primary" onClick={()=>onSee(stop_id)}>{see}</button>
                            </div>
                        </li>
                    })
                }
            </ul>
            <span className="help is-danger">{error}</span>
        </div>
    </section>
}

export default Favorites