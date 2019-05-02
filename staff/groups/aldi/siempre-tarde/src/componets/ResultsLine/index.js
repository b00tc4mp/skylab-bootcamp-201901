import React from 'react'
import literals from './literals'
import { Link } from 'react-router-dom'

function ResultsLine({ lang, stop }) {
    const { title1, back } = literals[lang]
    return <section>
    <Link to={`/`}><button>{back}</button></Link>
        <h2>{title1}-{stop[0].line}</h2>
        <ul>
            {
                stop.map(({ line, t_in_min, color_line, dest_line }) => {
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

export default ResultsLine