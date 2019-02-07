import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import logic from '../../logic'
import Favorite from '../Favorite'

import './index.sass'

class Favorites extends Component {

    state = {favorites: []}

    componentDidMount () {
        
        this.setState({favorites: []})

        logic.retrieveUser()
            .then (user => {
                this.setState ({ favorites: user.favorites})
            })
    }

    handleGoBack = event =>{
        event.preventDefault()
        this.props.history.push('/home/')
      }

    render (){

        return (
        <section className="Favorites">
            {(this.state.favorites || []).map(video => 
                <Favorite
                     key={video.imdbID} 
                     video={video}
                /> 
            )}
            {(!this.state.favorites || [] )&& <h3>You have no favorites yet... Search for movies and add them to your favorites</h3> }
            <div class="field">
              <p class="control">
                <button onClick={this.handleGoBack} onDeleted={this.handleDeleted} class="button is-info">Go back Home</button>
              </p>
            </div>
        </section>)
    }
}



export default withRouter(Favorites)