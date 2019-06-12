import React from 'react'
import moment from 'moment'
import logic from '../../logic'
import './index.sass'

function BidsInfo({date, currentAmount, totalBids, city, win}) {
    
    return <>{ (date && currentAmount && city) &&
        <>
        <p>{moment(date).format('D MMMM YYYY, LT')} - {city}</p>
        <hr className="uk-divider-icon"/>
        <p className="uk-text-large">
        {totalBids > 0 ? win ? <span className="uk-label uk-label-success bid-info__label">WINNING</span> : <span className="uk-label uk-label-danger bid-info__label">OUTBIDDED</span> : ""}
        {logic.getFormat(currentAmount)} <span className="uk-badge bid-info__badge">{totalBids} Bids</span></p>
        </>
    }
</>
}

export default BidsInfo