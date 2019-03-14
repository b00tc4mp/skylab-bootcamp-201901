import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'
import HouseCard from '../HouseCard'


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
        debugger
        let index = favorites.findIndex(fav => fav.id === house.id)
        if (index < 0) {
            console.log('done')
            favorites.push(house)
        } else {
            favorites.splice(index, 1)
        }
        this.setState({ favorites })
        // updateInfo()

    }


    listMyFavorites = (favorites, updateInfo) => {

        return favorites.map(house => {

            return <HouseCard house={house} updateInfo={updateInfo} toggleFavorite={this.toggleFavorite} isFav={true} origin='favorites' />
        });
    }




    render() {

        const { listMyFavorites, state: { favorites }, props: { updateInfo } } = this

        return <div className="favorites" >
            <h1 className="favorites__title">FAVORITES</h1>


            <div className="favorites__content">

                {favorites && listMyFavorites(favorites, updateInfo)}

            </div>



        </div>
    }


}


export default Favorites