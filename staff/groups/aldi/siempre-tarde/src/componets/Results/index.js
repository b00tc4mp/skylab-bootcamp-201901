import React from 'react'
import literals from './literals'
import { Route, withRouter, Redirect, Switch, Link } from 'react-router-dom'

function Results({ lang, items, stop }) {

    const { title1, back } = literals[lang]
    return <section>
    <Link to={`/byidstop`}><button>{back}</button></Link>
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

    </section>
}

export default Results