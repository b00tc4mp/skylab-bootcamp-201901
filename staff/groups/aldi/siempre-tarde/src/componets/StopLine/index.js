import React from 'react'
import literals from './literals'
import { Link } from "react-router-dom"
import logic from '../../logic';

function StopLine({ lang, onSearch, items, error, line_id }) {
    const { title1, select, back } = literals[lang]
    
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    items.sort(dynamicSort('line_id'))
    
    return <section>
        <Link to={`/`}><button>{back}</button></Link>
        <div>
            <h1>{title1}</h1>
            <select onChange={event => onSearch(event.target.value)} value={line_id}>
            <option key='select'>{select}</option>
                {
                    items.map(({ line_id, name_line, desc_line }) => {

                        return <option key={line_id} value={line_id}>{name_line} - {desc_line}</option>
                    })
                }
            </select>
            <h2>{error}</h2>
        </div>
    </section>








}
export default StopLine