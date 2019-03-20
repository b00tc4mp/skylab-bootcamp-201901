import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'





class HouseCard extends Component {

    state = {


        logged: false,
        thisHouse: "",
        isFav: this.props.isFav


    }

    componentDidMount() {

        if (logic.getUserApiToken()) {
            this.setState({ logged: true, thisHouse: this.props.house, isFav: this.props.isFav })


        } else {

            this.setState({ thisHouse: this.props.house })

        }



    }

    componentDidUpdate(prepProvs) {
        if (prepProvs.isFav !== this.props.isFav) {
            const { isFav } = this.props
            this.setState({ isFav })
        }

        if (prepProvs.house !== this.state.thisHouse) {
            const { house } = this.props
            this.setState({ thisHouse: house })


        }

    }

    deleteHouse = (event) => {

        if (this.props.deleteHouseList) {

            logic.deleteHouse(this.state.thisHouse.id)

            this.props.deleteHouseList(this.state.house)

        }

        event.stopPropagation()


    }

    ChangeHeart = () => this.setState({ isFav: !this.state.isFav })


    toggleFavorite = (event) => {

        if (this.props.toggleFavorite) {

            logic.toggleFavorite(this.state.thisHouse.id)
            this.ChangeHeart()
            this.props.toggleFavorite(this.state.thisHouse)


        }
        event.stopPropagation()


    }
    retrieveHouse = () => {


        const { props: { retrieveHouse } } = this


        retrieveHouse(this.state.thisHouse.id)

    }

    render() {

        const { state: { logged, isFav }, props: { house: { adress, images, id,info }, origin }, deleteHouse, toggleFavorite, retrieveHouse } = this
        const iSreadHeart = logged && origin != 'myHouses'
        const iSwhiteHeart = logged && origin != 'myHouses'

        return <div onClick={retrieveHouse} className="HouseCard">

            <img className="HouseCard__img" src={images[0]}></img>
            <div className= "Houscard__textWrap">
                <p className="HouseCard__text HouseCard__text-adress">{adress.country},{adress.city},{adress.street} {adress.number}</p>
                <p className="HouseCard__text HouseCard__text-info" >Pets allowed: {info.petsAllowed}</p>
                <p className="HouseCard__text HouseCard__text-info" >Smokers allowed: {info.smokersAllowed  }</p>
                <p className="HouseCard__text HouseCard__text-info" >Number of beds: {info.numberOfBeds}</p>


            </div>

            {iSreadHeart && isFav && (<i className="fas fa-heart favTrue icon" onClick={toggleFavorite}></i>)}
            {iSwhiteHeart && !isFav && (<i className="fas fa-heart icon" onClick={event => toggleFavorite(event)}></i>)}
            {logged && origin === 'myHouses' && <div>  <i class="fas fa-ban icon" onClick={event => deleteHouse(event)}></i> </div>}

        </div>


    }

}


export default HouseCard    