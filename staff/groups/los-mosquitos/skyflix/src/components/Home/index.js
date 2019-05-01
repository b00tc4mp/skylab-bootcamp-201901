import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Nav from '../Nav'
import Search from '../Search'
import Results from '../Results'
import Detail from '../Detail'
import Play from '../Play'

import { Route, withRouter, Switch, Redirect } from 'react-router-dom'


class Home extends Component {

    state = { movies: [], error: null, trailerMovie: null }

    handleSearch = query => {
        logic.searchMovies(query)
            .then(response => this.setState({
                movies: response.results.map(({ id, title, poster_path: image }) => {
                    const imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                    return { id, title, image: imagePath }
                })
            }))
            .then(response => {
                this.props.history.push(('/home/movies'))
            })
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    handleRetrieve = id => {

        this.props.history.push(('/home/movies/detail/' + id))
        // logic.retrieveMovie(id)
        //     .then(({ title, poster_path: image, overview: description, genres, release_date: date, vote_average: vote }) => {
        //         const imagePath = `https://image.tmdb.org/t/p/w300/${image}`
        //         this.setState({ movie: { title, image: imagePath, description, genres, date, vote } })
        //         return id
        //     })
        //     .then(id => {
        //         this.props.history.push(('/home/movies/detail/' + id))
        //     })

    }

    // handlekey= id => {
    //     logic.retrieveTrailer(id)
    //     .then(/*{id, results} => ({id, key: results[0].key})*/({id , results:[{key}]}) => {
    //             const videoKey= `https://www.youtube.com/embed/${key}`

    //     })


    // }



    handletoMovie = (id) => {
        logic.retrieveTrailer(id)
            .then(/*{id, results} => ({id, key: results[0].key})*/({ id, results: [{ key }] }) => {
                const videoKey = `https://www.youtube.com/embed/${key}`
                this.setState({ trailerMovie: videoKey }, this.props.history.push('/home/movies/detail/'+id+'/trailer'))
            })

    }


    render() {
        const {
            props: { lang, name, onLogout },
            state: { movies, movie, trailerMovie },
            handleSearch,
            handleRetrieve,
            handletoMovie,

        } = this

        const { hello } = literals[lang]

        return <main>
            <Nav lang={lang} /*onList={handleList} onProfile={handleProfile} */ onLogout={onLogout} />
            <h1>{hello}, {name}!</h1>
            <Search lang={lang} onSearch={handleSearch} />
            <Switch>
                <Route exact path="/home/movies" render={() => <Results lang={lang} items={movies} onItem={handleRetrieve} />} />
                <Route exact path="/home/movies/detail/:id" render={() => <Detail item={movie} toMovie={handletoMovie} />} />
                <Route path={"/home/movies/detail/:id/trailer"} render={() => <Play movie={trailerMovie} />} />
            </Switch>
        </main>
    }
}

export default withRouter(Home)