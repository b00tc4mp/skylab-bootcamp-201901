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


    listMyHouses(favorites,toggleFavs) {

        return favorites.map(house => {

            return HouseCard(house,toggleFavs)
        });
    }



    render() {

        const { listMyHouses, state: { user, favorites }, props:{toggleFavs} } = this

        return <div className="favorites" >
            <h1 className= "favorites__title">FAVORITES</h1>


            <div className= "favorites__content">

                {favorites && listMyHouses(favorites,toggleFavs)}

            </div>



        </div>
    }


}


export default Favorites