'use strict'
import React from 'react'
import './index.sass';





function HouseCard({adress,images},){

        
        return <div className="HouseCard">

            <img className="HouseCard__img" src={images[0]}></img>
            <p>{adress.city}</p>
            <p>{adress.street}  {adress.number}</p>


        </div>

}


export default HouseCard