import React from 'react'
import literals from './literals'
import { Route, withRouter, Redirect, Switch, Link } from 'react-router-dom'
import './index.sass'

function ResultsFav({ lang, items, stop, error, onFav, favs }) {

    const { back, to } = literals[lang]


    return <section className='main-results'>
    <div className='results-container'>
    <Link to={`/`}><button className="button is-rounded is-primary is-outlined">{back}</button></Link>
     <h2 className="title is-4 has-text-centered"> {stop} - {items[0].stop_name}</h2>
     <ul className="container">
         {
             items.map(({ line, t_in_min, color_line, dest_line, name_line, desc_line }) => {
                 let style = {
                     color: `#${color_line}`,
                   };
                 return <li className="columns" key={line}>
                     <div className="column is-6-mobile">
                         <h2 style={style}>{name_line} - {desc_line} {to} {dest_line}</h2>
                     </div>
                     <div className="column is-2-mobile">
                         <h3>{t_in_min} min</h3>
                     </div>
                 </li>
             })
         }
     </ul>
     <span className="help is-danger">{error}</span>
        </div>
    </section>
}

export default ResultsFav