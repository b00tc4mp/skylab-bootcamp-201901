import React from 'react'
import literals from './literals'
import { Link } from 'react-router-dom'
import './index.sass'
import emoji from 'react-easy-emoji'

function ResultsLine({ lang, stop, onFav, favs, error }) {
    const { title1, lin, dir,back, fav } = literals[lang]
    const isFav = favs.some((fav2) => fav2.stop_id === stop[0].stop_id)
    return <section className='main-results-line'>
    <div className='results-line-container'>
    <Link to={`/`}><button className="button is-rounded is-primary is-outlined">{back}</button></Link>
    {!isFav && <button className="button is-rounded is-primary" onClick={()=>onFav(stop[0].stop_id)}>{fav}</button>}
        <h2 className="title is-4 has-text-centered">{title1} {stop[0].stop_id}: {stop[0].stop_name}</h2>
        <ul className="container">
            {
                stop.map(({ line, t_in_min, color_line, dest_line }) => {
                    let style = {
                        color: `#${color_line}`,
                      };
                    return <li className="columns is-mobile is-centered" key={line}>
                        <div className="column is-6-mobile">
                            <h2 style={style}> <span>{ emoji(' 📍') }</span>{lin} {line} {dir} {dest_line}</h2>
                        </div>
                        <div className="column is-6-mobile">
                           <h3>{t_in_min} min<span>{ emoji(' 🚌💨💨') }</span> </h3>
                        </div>
                    </li>
                })
            }
        </ul>
        <span className="help is-danger">{error}</span>
        </div>
    </section>
}

export default ResultsLine