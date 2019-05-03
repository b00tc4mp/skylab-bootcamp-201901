import React from 'react'
import literals from './literals'
import { Link } from "react-router-dom"
import logic from '../../logic'
import './index.sass'

function StopLine2({ lang, onSearch, items, error, direction_id }) {
    const { title1, select, back } = literals[lang]

    return <section className='main-stopline2'>
        <div className='stopcode2-container'>
        <Link to={`/`}><button className="button is-rounded is-primary is-outlined">{back}</button></Link>
        <div>
            <h2 className="title is-4 has-text-centered">{title1}</h2>
            <div className='main-language select field'>
            <select onChange={event => onSearch(event.target.value)} value={direction_id}>
            <option key='select'>{select}</option>
                {   
                    items.map(({ direction_id, direction_name }) => {

                        return <option key={direction_id} value={direction_id}>{direction_id} - {direction_name}</option>
                    })
                }
            </select>
            <span className="help is-danger">{error}</span>
        </div>
        </div>
        </div>
    </section>








}
export default StopLine2