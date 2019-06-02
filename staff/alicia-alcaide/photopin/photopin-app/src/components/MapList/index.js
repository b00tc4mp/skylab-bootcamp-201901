import React from 'react'
import { Link } from 'react-router-dom'
import literals from './literals'
//import './index.sass'

function MapList({ lang, maps }) {

    //const { title } = literals[lang]

    return <section className="mapList">
        <ul>
            {
                maps.map(map =>{
                   return (
                    <li key={map._id}>
                        <Link to={`/map/${map._id}`}>{map.title}</Link>
                    </li>)
                })
            }
        </ul>
    </section>
}

export default MapList