import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'
import HouseCard from '../HouseCard'


class Favorites extends Component {


    state = {

        user: "",
        token: "",
        favorites: []
    }

    componentDidMount() {

        this.setState({ user: this.props.user })
        this.setState({ token: this.props.token })
        this.setState({ favorites: this.props.userFavs })
    }


    componentWillReceiveProps(props) {

        this.setState({ user: props.user })
        this.setState({ token: props.token })
        this.setState({ favorites: this.props.userFavs })


    }


    listMyHouses(favorites) {

        return favorites.map(house => {

            return HouseCard(house)
        });
    }



    render() {

        const { listMyHouses, state: { user, favorites } } = this

        return <div className="favorites" >
            <h1 className= "favorites__title">FAVORITES</h1>


            <div className= "favorites__content">

                {favorites && listMyHouses(favorites)}

            </div>



        </div>
    }


}


export default Favorites