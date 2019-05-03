import React from 'react'
import literals from './literals'
import { Route, withRouter, Redirect, Switch, Link } from 'react-router-dom'
import './index.sass'
import emoji from 'react-easy-emoji'

function Results({ lang, items, stop, error, onFav, favs }) {

    const { back, fav , to} = literals[lang]
    const isFav = favs.some((fav2) => fav2.stop_id === stop)

    return <section className='main-results'>
    <div className='results-container'>
    <Link to={`/byidstop`}><button className="button is-rounded is-primary is-outlined">{back}</button></Link>
     {!isFav && <button className="button is-rounded is-primary" onClick={()=>onFav(stop)}>{fav}</button>}
        <h2 className="title is-4 has-text-centered"> {stop} - {items[0].stop_name}</h2>
        <ul className="container">
            {
                items.map(({ line, t_in_min, color_line, dest_line, name_line, desc_line }) => {
                    let style = {
                        color: `#${color_line}`,
                      };
                    return <li className="columns is-mobile is-centered" key={line}>
                        <div className="column is-6-mobile">
                            <h2 style={style}><span>{ emoji(' 📍') }</span>{name_line} - {desc_line} {to} {dest_line}</h2>
                        </div>
                        <div className="column is-6-mobile">
                            <h3>{t_in_min} min<span>{ emoji(' 🚌💨💨') }</span></h3>
                        </div>
                    </li>
                })
            }
        </ul>
        <span className="help is-danger">{error}</span>
        </div>
    </section>
}

export default Results