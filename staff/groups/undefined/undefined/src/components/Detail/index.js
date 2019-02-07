import React, { Component } from 'react';
import logic from '../../logic'

import './index.sass'

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

    //<button onClick={handleFavorites}>Favorites</button>
    printDetails = () => {
        if (this.state.videoSelected) {
            const {handleFavorites, state: {videoSelected: {Title, Runtime, Plot, Genre, Actors, Poster, Released}}} = this
            return (
                <section className="detail modal is-active">

                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <article className="media columns">
                                <div className="poster media-left column">
                                    <figure className="image">
                                        <img className="image" src={Poster} alt={Title} />
                                    </figure>
                                </div>
                                <div className="media-content column">
                                    <div className="content">
                                        <h4 className="title is-3">{Title}</h4>
                                        <hr />
                                            <button className="button"><i class="far fa-heart"></i></button>
                                        <hr />
                                        <p>{Plot}</p>
                                    </div>
                                    <hr />
                                    <div className="info">

                                        <div className="info-item">
                                            <span className="genres"><i class="fas fa-genderless"></i> <strong>Genres:</strong> <span>{Genre}</span></span>
                                        </div>

                                        <div className="info-item">
                                            <span className="released"><i class="fas fa-genderless"></i> <strong>Released:</strong> <span>{Released}</span></span>
                                        </div>

                                        <div className="info-item">
                                            <span className="runtime"><i class="fas fa-genderless"></i> <strong>Runtime:</strong> <span>{Runtime}</span></span>
                                        </div>

                                        <div className="info-item">
                                            <span className="runtime"><i class="fas fa-genderless"></i> <strong>Actors:</strong> <span>{Actors}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <button onClick={this.onClose} className="modal-close is-large" aria-label="close"></button>
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