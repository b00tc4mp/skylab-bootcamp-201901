import React from 'react'
import literals from './literals'
import { Link } from "react-router-dom"
import logic from '../../logic'
import './index.sass'

function StopLine2({ lang, onSearch, items, error, direction_id }) {
    const { title1, select, back } = literals[lang]

    return <section className='main-stopline'>
        <div className='stopcode-container'>
        <Link to={`/`}><button>{back}</button></Link>
        <div>
            <h1>{title1}</h1>
            <select onChange={event => onSearch(event.target.value)} value={direction_id}>
            <option key='select'>{select}</option>
                {   
                    items.map(({ direction_id, direction_name }) => {

                        return <option key={direction_id} value={direction_id}>{direction_id} - {direction_name}</option>
                    })
                }
            </select>
            <h2>{error}</h2>
        </div>
        </div>
    </section>








}
export default StopLine2