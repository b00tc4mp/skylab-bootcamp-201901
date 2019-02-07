import React, {Component} from 'react'
import logic from '../../logic'

import Favorite from '../Favorite'

import './index.sass'

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
            
        </section>)
    }
}



export default Favorites