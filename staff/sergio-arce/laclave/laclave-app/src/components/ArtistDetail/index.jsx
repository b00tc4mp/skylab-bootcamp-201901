import React from 'react'

function ArtistDetail ({ onItem }) {
     
      return (

        <section className="artist-detail">

              <div className="artist-detail__image" >
                <img src={onItem.image} alt={onItem.name} />
              </div>
              
              <div className="artist-detail__info">
                <h1>{onItem.name}</h1>
                <p>age: {onItem.year}</p>
                <p>country: {onItem.country}</p>
                <p>category: {onItem.category[0]}</p>
              </div>
          
        </section>
      )
  
}

export default ArtistDetail