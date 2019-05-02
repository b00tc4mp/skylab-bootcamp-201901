import React from 'react'
import literals from './literals'
import { Route, withRouter, Redirect, Switch, Link } from 'react-router-dom'

function Results({ lang, items, stop, error, onFav, favs }) {

    const { title1, back } = literals[lang]
    const isFav = favs.some(fav => fav.id === stop)

    return <section>
    <Link to={`/byidstop`}><button>{back}</button></Link>
    <button onClick={()=>onFav(stop)}>FAV</button>
        <h2>{title1}-{stop}</h2>
        <ul>
            {
                items.map(({ line, t_in_min, color_line, dest_line }) => {
                    let style = {
                        color: `#${color_line}`,
                      };
                    return <li key={line} onClick={() => console.log(line)}>
                        <h2 style={style}>{line} - {dest_line}</h2>
                        <h3>{t_in_min} minutos</h3>
                    </li>
                })
            }
        </ul>
        <h2>{error}</h2>

    </section>
}

export default Results