import React, {Component} from 'react'

import logic from '../../logic'

import './index.sass'

class Favorite extends Component {

    state = {videoSelected: null}

    componentDidMount () {

        logic.retrieveVideo(this.props.video)
            .then(details => {
                this.setState({ videoSelected: details}) })
            .catch( ({message}) => {
                this.setState({ videoSelected: null, searchFeedback: message })
            })
    }

    handleFavorites = () => {
        const {props :{video}} = this
        logic.toggleFavorties(video)
        this.setState ({videoSelected:null})
    }

    render(){
        if (this.state.videoSelected) {

        const { handleFavorites, state: {videoSelected: {Title, Year, Rated, Runtime, Plot, Genre, Actors, Poster}}} = this
        
        return (
            <section className="detail">
            <h3>{Title}</h3>
            <p className="detail__year">{Year}</p>
            <p className="detail__rated">{Rated}</p>
            <p className="detail__runtime">{Runtime}</p>
            <p className="detail__plot">{Plot}</p>
            <p className="detail__genre">{Genre}</p>
            <p className="detail__actors">{Actors}</p>
            <img src={Poster} className="detail__poster" alt={Title} />
            <button onClick={handleFavorites}>Delete from favorites</button>
        </section>)
    }
    else return <div></div>
    }
}

export default Favorite