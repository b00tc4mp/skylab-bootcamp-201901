import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'





class HouseCard extends Component {

    state = {


        logged: false,
        thisHouse:"",
        isFav: this.props.isFav


    }

    componentDidMount() {

        if (logic.getUserApiToken()) {
            this.setState({ logged: true, thisHouse: this.props.house, isFav: this.props.isFav })


        }



    }

    deleteHouse = () => {

        if (this.props.deleteHouseList) {

            logic.deleteHouse(this.state.thisHouse.id)

            this.props.deleteHouseList(this.state.house)

        }



    }

    ChangeHeart = () =>  this.setState({isFav: !this.state.isFav})


    toggleFavorite = () => {

        if (this.props.toggleFavorite) {

            logic.toggleFavorite(this.state.thisHouse.id)

            this.props.toggleFavorite(this.state.thisHouse, this.ChangeHeart)

        }



    }

    render() {

        const { state: { logged,isFav }, props: { house: { adress, images, id }, retrieveHouse, origin }, deleteHouse,toggleFavorite } = this

        return <div onClick={retrieveHouse} className="HouseCard">

            <img className="HouseCard__img" src={images[0]}></img>
            <p className="HouseCard__text HouseCard__text-city">{adress.city}</p>
            <p className="HouseCard__text HouseCard__text-adress" >{adress.street}  {adress.number}</p>
            {logged && (origin != 'myHouses' ? ( isFav ? <i class="fas fa-heart favTrue" onClick={toggleFavorite}></i> :<i class="fas fa-heart" onClick={toggleFavorite}></i>) : <div>  <i class="fas fa-ban" onClick={deleteHouse}></i>  <i class="fas fa-pen"></i>  </div>)}


        </div>


    }

}


export default HouseCard    