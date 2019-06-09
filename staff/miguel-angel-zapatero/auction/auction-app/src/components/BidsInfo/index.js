import React from 'react'
import moment from 'moment'

function BidsInfo({date, currentAmount, totalBids, city}) {
    
    return <>{ (date && currentAmount && totalBids && city) &&
        // <dl className="uk-description-list uk-description-list-divider">
            <>
            <p>{moment(date).format('D MMMM YYYY, LT')} - {city}</p>
            <hr className="uk-divider-icon"/>
            <p className="uk-text-large">{currentAmount} € <span className="uk-badge">{totalBids} Bids</span></p>
            </>
            // <dd>{totalBids} Bids</dd>
        // </dl>
        }
    </>
}

export default BidsInfo