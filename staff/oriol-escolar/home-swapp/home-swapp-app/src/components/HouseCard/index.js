import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'


class HouseCard extends Component {

    
    render() {

        const { props: { house } }

        return <div className="HouseCard">

            <img src={house.images[0]}></img>
            <p>{house.adress.city}</p>
            <p>{house.adress.sreet} + {house}</p>


        </div>

    }


}


export default HouseCard