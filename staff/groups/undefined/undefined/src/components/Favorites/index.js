import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import logic from '../../logic'
import Favorite from '../Favorite'

import './index.sass'

class Favorites extends Component {

    state = {favorites: [], numFav: 0}

    componentDidMount () {
        this.setState({favorites: [], numFav: 0})
        logic.retrieveUser()
            .then (user => { this.setState ({ favorites: user.favorites, numFav: user.favorites.length }) })
    }

    handleGoBack = event =>{
        event.preventDefault()
        this.props.history.push('/home/')
      }

    handleMsgEmptyFav = () => {
        let numFavo = this.state.numFav
        this.setState({ numFav: --numFavo })
        //console.log(this.state.favorites.length)
        console.log('NumFavo', numFavo)
    }

    render (){

        const {handleMsgEmptyFav, handleGoBack, state: {favorites, numFav}} = this

        return (
        <section className="favorites section columns is-fullheight">
            <div className="container column is-10">
            {(favorites || []).map(video => 
                <Favorite
                     key={video.imdbID} 
                     video={video}
                     MsgEmptyFav={handleMsgEmptyFav}
                /> 
            )}
            {(numFav === 0) && <h3>You have no favorites yet... Search for movies and add them to your favorites</h3> }
            <div className="field">
              <p className="control">
                <button onClick={handleGoBack}  className="button is-info">Go back Home</button>
              </p>
            </div>
            </div>
        </section>)
    }
}

export default withRouter(Favorites)