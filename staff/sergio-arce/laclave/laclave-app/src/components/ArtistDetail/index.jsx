import React from 'react'

function ArtistDetail ({ onItem }) {
     
      return (

        <section className="artist-detail">

              <div className="artist-detail__image" >
                <img src={onItem.image} alt={onItem.name} />
              </div>
              
              <div className="artist-detail__info">
                <h1>{onItem.name}</h1>
                <p>Age: {2019 - onItem.year}</p>
                <p>Country: {onItem.country}</p>
                <p>Category: {onItem.category[0]}</p>
              </div>
          
        </section>
      )
  
}

export default ArtistDetail