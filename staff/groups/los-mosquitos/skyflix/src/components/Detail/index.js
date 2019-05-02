import React, { Component } from 'react'
import logic from '../../logic'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

class Detail extends Component {

    state = { title: '', image: '', description: '', genres: '', date: '', vote: '' }

    componentDidMount() {

        const {
            match: {
                params: { id },
            },
        } = this.props;

        logic.retrieveMovie(Number(id))
            .then(({ title, poster_path: image, overview: description, genres, release_date: date, vote_average: vote }) => {
                const imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                this.setState({ title, image: imagePath, description, genres, date, vote })
            })
    }



    render() {

        const {
            props: {toMovie, match: {
                params: { id },
            }, },
            state: { title, image, description, genres, date, vote }
        } = this

        return <>

            <section>
                <h2>{title}</h2>
                <span>{vote}</span>
                <img src={image} />
                <p>{description}</p>
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