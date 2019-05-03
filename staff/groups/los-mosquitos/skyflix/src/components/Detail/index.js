import React, { Component } from 'react'
import logic from '../../logic'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import './index.sass'

class Detail extends Component {

    state = { title: '', image: '', description: '', genres: '', date: '', vote: '', favs: [] }

    componentDidMount() {

        const {
            match: {
                params: { id },
            },
        } = this.props;

        Promise.all([logic.retrieveMovie(Number(id)), logic.retrieveMovieUserList()])
            .then(([{ title, poster_path: image, overview: description, genres, release_date: date, vote_average: vote }, favs]) => {
                const imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                this.setState({ title, image: imagePath, description, genres, date, vote, favs })
            })
    }



    render() {

        const {
            props: { toMovie, onFav, favs, match: {
                params: { id },
            }, },
            state: { title, image, description, genres, date, vote }
        } = this

        const isList = favs.some(movie => movie.id == id)

        return (
            <section className="card">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img className="card-img" src={image} />
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text"><span>Vote:</span> {vote} <span>{ genres && genres.map(genre => {
                                return genre.name
                            }).join(' | ')
                        }</span></p>
                        <p className="card-text">{description}</p>

                        <div className="btn-list bg-primary">
                        <FontAwesomeIcon icon={isList ? faThumbsUp : faPlus} onClick={e => {
                            e.stopPropagation()
                            onFav(Number(id))
                        }} />
                        </div>
               
                        <p className="card-text"><span>Release date:</span> {date}</p>

                        <a className="btn btn-success" href="" onClick={(event) => {
                            event.preventDefault()
                            toMovie(Number(id))
                        }}>View Film</a>
                    </div>
                    </div>
                </div>
            </section>
        )
    }


}

export default withRouter(Detail)