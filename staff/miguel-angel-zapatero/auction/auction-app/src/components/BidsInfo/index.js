import React from 'react'
import moment from 'moment'
import './index.sass'

function BidsInfo({date, currentAmount, totalBids, city, win}) {
    
    return <>{ (date && currentAmount && city) &&
        <>
        <p>{moment(date).format('D MMMM YYYY, LT')} - {city}</p>
        <hr className="uk-divider-icon"/>
        <p className="uk-text-large">
        {win ? <span className="uk-label uk-label-success bid-info__label">WIN</span> : <span className="uk-label uk-label-danger bid-info__label">LOSE</span>}
        {currentAmount} € <span className="uk-badge bid-info__badge">{totalBids} Bids</span></p>
        </>
    }
</>
}

export default BidsInfo