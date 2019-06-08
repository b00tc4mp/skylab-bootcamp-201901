import React from 'react'
import { Link } from 'react-router-dom'
import literals from './literals'

function MapList({ maps }) {

    debugger
    return <section className="mapList">
        <ul>
            {
                maps.map(map => {
                    return (
                        <li key={map._id}>
                            <img src={map.coverImage} />
                            <Link to={`/map/${map._id}`}>{map.title}</Link>
                        </li>)
                })
            }
        </ul>
    </section>
}

export default MapList