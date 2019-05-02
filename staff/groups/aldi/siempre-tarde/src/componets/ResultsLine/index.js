import React from 'react'
import literals from './literals'
import { Link } from 'react-router-dom'

function ResultsLine({ lang, stop, error }) {
    const { title1, lin, dir,back } = literals[lang]
    return <section>
    <Link to={`/`}><button>{back}</button></Link>
        <h2>{title1} {stop[0].stop_id}: {stop[0].stop_name}</h2>
        <ul>
            {
                stop.map(({ line, t_in_min, color_line, dest_line }) => {
                    let style = {
                        color: `#${color_line}`,
                      };
                    return <li key={line} onClick={() => console.log(line)}>
                        <h2 style={style}> {lin} {line} {dir} {dest_line}</h2>
                        <h3>{t_in_min} min</h3>
                    </li>
                })
            }
        </ul>
        <h2>{error}</h2>
    </section>
}

export default ResultsLine