import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Genres from '../SelectGenres'
import Nav from '../Nav'
import Name from '../Name'
import Search from '../Search'
import Results from '../Results'
//import Pagination from '../Pagination'
import MoviesGenres from '../MoviesGenres'
import Detail from '../Detail'
import Play from '../Play'

import { Route, withRouter, Switch, Redirect } from 'react-router-dom'


class Home extends Component {
    state = { movies: [], error: null, trailerMovie: null, userNameGenre: null }


    handleSearch = query => {
        try {
            logic.searchMovies(query)
                .then(response => this.setState({
                    movies: response.results.map(({ id, title, poster_path: image }) => {
                        let imagePath
                        if(image) imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                        else imagePath = 'https://via.placeholder.com/300x450'                       
                        return { id, title, image: imagePath }
                    })
                , error: null}, this.props.history.push(('/home/movies'))))
                .catch(error => {
                    this.setState({ error: error.message })
                })
          } catch(error) {
            this.setState({ error: error.message })
        }
    }

    componentDidMount() {
        const state = {}
        logic.retrieveUser()
            .then(({ fullname, genres }) => {
                state.userGenres = genres
                state.fullname = fullname
                // if(!genres)
                return logic.retrieveMovieGenres()
                    .then(({ genres }) => {
                        state.movieGenres = genres
                    })
            })
            .then(()=> this.setState(state))
            .catch(error => this.setState({ error: error.message }))
    }

    handleOnChangeGenres = genres => {
        logic.updateGenresUser(genres)
            .then(() => this.setState({userGenres: genres}))
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
            props: { lang, onLogout },
            state: { movies, movie, trailerMovie, movieGenres, userGenres, fullname, error },
            handleSearch,
            handleRetrieve,
            handletoMovie,
            handleOnChangeGenres
        } = this
        
        return <main>
            {userGenres && <Nav lang={lang} /*onList={handleList} onProfile={handleProfile} */ onLogout={onLogout} />}
            <Name lang={lang} name={fullname} />
            {userGenres && <Search lang={lang} onSearch={handleSearch} /> }
            {!userGenres && movieGenres && <Genres lang={lang} genres={movieGenres} onUpdate={handleOnChangeGenres}/>}
            <Switch>
                <Route exact path="/home/movies" render={() => <Results lang={lang} items={movies} onItem={handleRetrieve} error={error} />} />
                <Route exact path="/home/movies/detail/:id" render={() => <Detail item={movie} toMovie={handletoMovie} />} />
                <Route path={"/home/movies/detail/:id/trailer"} render={() => <Play movie={trailerMovie} />} />
            </Switch>
             
            {/* esconder cuando busque pelis */}
            {userGenres && <MoviesGenres userGenres={userGenres} movieGenres={movieGenres} lang={lang} />}
        </main>
    }
}

export default withRouter(Home)