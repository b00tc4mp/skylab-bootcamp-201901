import React from 'react'

import moment from 'moment'

function CongressDetail({ onItem }) {
         
      return (

        <section className="congress-detail">
                <div className="congress-detail__image" >
                  <img src={onItem.image} alt={onItem.name} />
                </div>
                
                <div className="congress-detail__info">
                    <h1>{onItem.name}</h1>
                    <p>Description: {onItem.description}</p>
                    <p>City: {onItem.city}</p>
                    <p>Hotel: {onItem.hotel}</p>
                    <p>Category: {onItem.category}</p>
                    <p>Start Date: {moment(onItem.startDate).format('DD MMM')}</p>
                    <p>End Date: {moment(onItem.endDate).format('DD MMM')}</p>
                </div>
        </section>
      )
  
}

export default CongressDetail