'use strict'
import React from 'react'




function HouseCard(house){

        return <div className="HouseCard">

            <img src={house.images[0]}></img>
            <p>{house.adress.city}</p>
            <p>{house.adress.sreet} + {house}</p>


        </div>

}


export default HouseCard