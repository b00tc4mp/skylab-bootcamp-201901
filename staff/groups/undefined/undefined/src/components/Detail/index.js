import React, { Component } from 'react';
import logic from '../../logic'


class Detail extends Component {

    state = {videoSelected: null, id: null}

    componentDidMount () {
        const {props: {match: {params :{id}}}, handleVideoClick} = this
        id && handleVideoClick(id) 
    }

    handleVideoClick = id => {
        logic.retrieveVideo(id)
            .then(details => {
                this.setState({ videoSelected: details}) })
            .catch( ({message}) => {
                this.setState({ videoSelected: null, searchFeedback: message })
            }) 
    }

    componentWillReceiveProps(nextProps) {
        const {match: {params :{id}} } = nextProps

            this.handleVideoClick(id)
    }

    onClose = () => {
        this.setState({ videoSelected: null })
        this.props.history.push(`/videos/${this.props.match.params.query}`)
    }

    handleFavorites = () => {
        const {props: {match: {params :{id}}}} = this
        logic.toggleFavorties(id)
    }


    printDetails = () => {
        if (this.state.videoSelected) {
            const {handleFavorites, state: {videoSelected: {Title, Runtime, Plot, Genre, Actors, Poster, Released}}} = this
            return (
                <section className="detail modal is-active">

                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <div class="box">
                            <article class="media">

                                <div class="media-left">
                                    <figure class="image">
                                        <img src={Poster} alt={Title} />
                                    </figure>
                                </div>

                                <div class="media-content">
                                    <div class="content">
                                        <h4 class="title is-3">{Title}</h4>
                                        <p>{Plot}</p>
                                    </div>

                                    <div class="info">

                                        <div class="info-item">
                                            <span class="genres">Genres: <span>{Genre}</span></span>
                                        </div>

                                        <div class="info-item">
                                            <span class="released">Released: <span>{Released}</span></span>
                                        </div>

                                        <div class="info-item">
                                            <span class="runtime">Runtime: <span>{Runtime}</span></span>
                                        </div>

                                        <div class="info-item">
                                            <span class="runtime">Actors: <span>{Actors}</span></span>
                                        </div>
                                    </div>
              
                                <button onClick={handleFavorites}>Favorites</button>
                                </div>
                            </article>
                        </div>
                    </div>
                    <button onClick={this.onClose} class="modal-close is-large" aria-label="close"></button>
                </section>

            )
        }

        return <p>Loading....</p>
    }

    render() {
        
        const { printDetails }  = this
        return (
            <div>
                {printDetails()}
            </div>
        )
    }
}


export default Detail