import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import logic from '../../logic'
import Favorite from '../Favorite'

class Favorites extends Component {

    state = {favorites: []}

    componentDidMount () {
        
        logic.retrieveUser()
            .then (user => {
                this.setState ({ favorites: user.favorites})
            })
    }

    handleGoBack = event =>{
        event.preventDefault()
        this.props.history.push('/')
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
            {!this.state.favorites || [] && <h3>You have no favorites yet... Search for movies and add them to your favorites</h3> }
            <div class="field">
              <p class="control">
                <button onClick={this.handleGoBack} class="button is-info">Go back Home</button>
              </p>
            </div>
        </section>)
    }
}



export default withRouter(Favorites)