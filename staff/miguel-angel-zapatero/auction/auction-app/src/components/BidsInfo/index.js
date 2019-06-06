import React from 'react'
import moment from 'moment'

function BidsInfo({date, currentAmount, totalBids, city}) {
    
    return <>
        <h4>{moment(date).format('DD-MM-YYYY, HH:mm:ss')} - {city}</h4>
        <h3>{totalBids} Bids</h3>
        <h2>{currentAmount} €</h2>
    </>
}

export default BidsInfo