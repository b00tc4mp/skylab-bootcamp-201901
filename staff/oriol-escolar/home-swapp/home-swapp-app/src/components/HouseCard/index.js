import React, { Component } from 'react'
import './index.sass';





class HouseCard extends Component {

    render() {

        const { house: { adress, images, id }, retrieveHouse, origin } = this.props

        return <div onClick={retrieveHouse} className="HouseCard">

            <img className="HouseCard__img" src={images[0]}></img>
            <p className="HouseCard__text-city">{adress.city}</p>
            <p className="HouseCard__text-adress" >{adress.street}  {adress.number}</p>
            {origin != 'myHouses' ? <p>ADD TO FAVORITES</p> : <div>   <p>DELETE</p>  <p>EDIT</p>  </div>  }


        </div>


    }

}


export default HouseCard    