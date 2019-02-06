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


    printDetails = () => {
        if (this.state.videoSelected) {
            const {state: {videoSelected: {Title, Year, Rated, Runtime, Plot, Genre, Actors, Poster}}} = this
            return (
                <section className="detail">
                <button onClick={this.onClose}>X</button>
                <h3>{Title}</h3>
                <p className="detail__year">{Year}</p>
                <p className="detail__rated">{Rated}</p>
                <p className="detail__runtime">{Runtime}</p>
                <p className="detail__plot">{Plot}</p>
                <p className="detail__genre">{Genre}</p>
                <p className="detail__actors">{Actors}</p>
                <img src={Poster} className="detail__poster" alt={Title} />
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