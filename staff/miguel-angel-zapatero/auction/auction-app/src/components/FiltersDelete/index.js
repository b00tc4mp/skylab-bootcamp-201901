import React from 'react'
import moment from 'moment'

function FiltersDelete({startDate, endDate, startPrice, endPrice, city, category, onDelete}) {
    return <>
        <dl className="uk-text-small">
            <dt>APPLIED FILTERS</dt>
            {(startDate && endDate) && <dd>Date {moment(startDate).format('D/M/YYYY')} - {moment(endDate).format('D/M/YYYY')}</dd>}
            {endPrice && <dd>Estimate {startPrice}€ - {endPrice}€</dd>}
            {city && <dd>{city}</dd>}
            {category && <dd>{category}</dd>}
            <br/>
            <button className="uk-button uk-button-danger uk-button-small" onClick={onDelete}>Delete Filters</button>
        </dl>
    </>
}

export default FiltersDelete