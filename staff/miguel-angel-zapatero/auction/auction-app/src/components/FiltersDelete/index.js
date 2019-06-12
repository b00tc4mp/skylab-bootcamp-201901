import React from 'react'
import moment from 'moment'
import logic from '../../logic'

function FiltersDelete({startDate, endDate, startPrice, endPrice, city, category, onDelete}) {
    return <>
        <dl className="uk-text-small">
            <dt>APPLIED FILTERS</dt>
            {(startDate && endDate) && <dd>Date {moment(startDate).format('D/M/YYYY')} - {moment(endDate).format('D/M/YYYY')}</dd>}
            {endPrice && <dd>Estimate {logic.getFormat(startPrice)} - {logic.getFormat(endPrice)}</dd>}
            {city && <dd>{city}</dd>}
            {category && <dd>{category}</dd>}
            <br/>
            <button className="uk-button uk-button-danger uk-button-small" onClick={onDelete}>Delete Filters</button>
        </dl>
    </>
}

export default FiltersDelete