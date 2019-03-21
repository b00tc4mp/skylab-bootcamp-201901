import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'
import HouseCard from '../HouseCard'
import Spinner from '../Spinner';


class Favorites extends Component {


    state = {

        favorites: ""
    }

    componentDidMount() {

        this.setState({ favorites: this.props.userFavs })
    }


    componentWillReceiveProps(props) {
        this.setState({ favorites: props.userFavs })
    }


    toggleFavorite = (house) => {

        const { state: { favorites }, props: { updateInfo } } = this
        
        let index = favorites.findIndex(fav => fav.id === house.id)
        if (index < 0) {
            favorites.push(house)
        } else {
            favorites.splice(index, 1)
        }
        this.setState({ favorites })
        updateInfo()

    }


    listMyFavorites = (favorites, updateInfo,retrieveHouse) => {

        return favorites.map(house => {

            return <HouseCard house={house} updateInfo={updateInfo} toggleFavorite={this.toggleFavorite} isFav={true} retrieveHouse={retrieveHouse} origin='favorites' />
        });
    }




    render() {

        const { listMyFavorites, state: { favorites }, props: { updateInfo,retrieveHouse } } = this

        return <div className="favorites" >
            {favorites && <h1 className="favorites__title">FAVORITES</h1>}


            <div className="favorites__content">

                {favorites ? listMyFavorites(favorites, updateInfo,retrieveHouse): <Spinner></Spinner>}

            </div>



        </div>
    }


}


export default Favorites