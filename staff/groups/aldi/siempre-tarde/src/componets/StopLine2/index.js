import React from 'react'
import literals from './literals'
import { Link } from "react-router-dom"
import logic from '../../logic';

function StopLine2({ lang, onSearch, items, error, direction_id }) {
    const { title1, select, back } = literals[lang]

    return <section>
        <Link to={`/`}><button>{back}</button></Link>
        <div>
            <h1>{title1}</h1>
            <select onChange={event => onSearch(event.target.value)} value={direction_id}>
            <option key='select'>{select}</option>
                {   
                    items.map(({ direction_id, direction_name }) => {

                        return <option key={direction_id} value={direction_id}>{direction_id}-{direction_name}</option>
                    })
                }
            </select>
            <span>{error}</span>
        </div>
    </section>








}
export default StopLine2