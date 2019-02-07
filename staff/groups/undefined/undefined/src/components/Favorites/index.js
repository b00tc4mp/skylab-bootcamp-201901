import React, {Component} from 'react'
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
            
        </section>)
    }
}



export default Favorites