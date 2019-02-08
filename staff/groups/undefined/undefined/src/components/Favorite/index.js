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

        const { handleFavorites, 
            state: {videoSelected: {Title, Year, Runtime, Genre, Director, Plot, Writer, Actors, Type, Country, Awards, imdbRating, BoxOffice, Production, Website, Poster}}} = this

        if (this.state.videoSelected.Poster === "N/A")  this.setState({videoSelected: ({Title, Year, Runtime, Genre, Director, Plot, Writer, Actors, Type, Country, Awards, imdbRating, BoxOffice, Production, Website, Poster : "http://www.lbsnaa.gov.in/upload/academy_souvenir/images/59031ff5e92caNo-image-available.jpg"})})
        
        return (
            <section className="fav-detail card columns is-4">
                <div className="card-image">
                    <figure className="image">
                        <img src={Poster} alt={Title} />
                    </figure>
                </div>


                <div className="card-content">
          
                       <div className="card-content__top">
                        <h3 className="title is-3">{Title}</h3>
                          <div className="block">
                          <span className="tag is-danger">
                              Remove from favorites
                              <button onClick={handleFavorites} className="delete is-small"></button>
                          </span>
                          </div>
                           <p>{Plot}</p>


                        <div className="content-details"> 
          
                          <div className="tags-details">
                            <span className="tag is-info">{Country}</span>
                            <span className="tag is-info">{Awards}</span>
                            <span className="tag is-info">{imdbRating}</span>
                            <span className="tag is-info">{BoxOffice}</span>
                            <span className="tag is-info">{Production}</span>

                          </div>
          
                        </div>
                </div>
        </section>)
    }
    else return <div></div>
    }
}

export default Favorite