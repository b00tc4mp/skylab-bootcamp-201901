import React, { Component } from 'react'
import logic from '../../logic'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

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

        return <>


            <section>
                <h2>{title}</h2>
                <span>{vote}</span>
                <img src={image} />
                <p>{description}</p>

                <div>

                    <FontAwesomeIcon icon={isList ? faThumbsUp : faPlus} onClick={e => {
                        e.stopPropagation()

                        onFav(Number(id))
                    }} />

                </div>

                <p><span>{date}</span></p>
                {
                    genres && genres.map(genre => genre.name)
                }
            </section>


            <a href="" onClick={(event) => {
                event.preventDefault()
                toMovie(Number(id))
            }}>

                <label>Click</label>
            </a>
        </>
    }


}

export default withRouter(Detail)