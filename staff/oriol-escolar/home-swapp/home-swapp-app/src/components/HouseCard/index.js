'use strict'
import React from 'react'
import './index.sass';





function HouseCard({adress,images,id},toggleFavs){

        
        return <div className="HouseCard">

            <img className="HouseCard__img" src={images[0]}></img>
            <p className="HouseCard__text-city">{adress.city}</p>
            <p className="HouseCard__text-adress" >{adress.street}  {adress.number}</p>
            {/* <p onClick={toggleFavs(id)}>ADD TO FAVORITES</p> */}


        </div>

}


export default HouseCard    