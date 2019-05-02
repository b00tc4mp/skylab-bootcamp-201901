import React, { Component } from 'react'
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
import './index.sass'

import { Route, withRouter, Switch, Redirect } from 'react-router-dom'


class Home extends Component {
    state = { movies: [], error: null, trailerMovie: null, userNameGenre: null, favs: [] }


    handleSearch = query => {
        try {
            Promise.all([logic.searchMovies(query), logic.retrieveMovieUserList()])
                .then(([response, favs]) =>
                    this.setState({
                        movies: response.results.map(({ id, title, poster_path: image }) => {
                            let imagePath
                            if (image) imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                            else imagePath = 'https://via.placeholder.com/300x450'
                            return { id, title, image: imagePath }
                        })
                        , error: null , favs
                    }, () => this.props.history.push(('/home/movies'))))
                .catch(error => {
                    this.setState({ error: error.message })
                })
        } catch (error) {
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
            .then(() => this.setState(state))
            .catch(error => this.setState({ error: error.message }))
    }

    handleOnChangeGenres = genres => {
        logic.updateGenresUser(genres)
            .then(() => this.setState({ userGenres: genres }))
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
                this.setState({ trailerMovie: videoKey }, this.props.history.push('/home/movies/detail/' + id + '/trailer'))
            })

    }

    handleHome = () => this.props.history.push('/home')

    handleFav = (id) =>{
    
        logic.toggleMovieUserList(id)
            .then(() => logic.retrieveMovieUserList())
            .then(favs => this.setState({ favs }))
    }
    render() {
        const {
            props: { lang, onLogout },
            state: { movies, movie, trailerMovie, movieGenres, userGenres, fullname, error, favs },
            handleSearch,
            handleRetrieve,
            handletoMovie,
            handleOnChangeGenres,
            handleHome,
            handleFav
        } = this

        return <main>
            {userGenres && <Nav lang={lang} /*onList={handleList} onProfile={handleProfile} */ onLogout={onLogout} onHome={handleHome} />}
            <Name lang={lang} name={fullname} />
            {userGenres && <Search lang={lang} onSearch={handleSearch} />}
            {!userGenres && movieGenres && <Genres lang={lang} genres={movieGenres} onUpdate={handleOnChangeGenres} />}
            <Switch>
                <Route exact path="/home/movies" render={() => <Results lang={lang} items={movies} onItem={handleRetrieve} error={error} onFav={handleFav} favs={favs} />} />               
                <Route exact path="/home/movies/detail/:id" render={() => <Detail item={movie} toMovie={handletoMovie} onFav={handleFav} favs={favs}/>} />
                <Route path={"/home/movies/detail/:id/trailer"} render={() => <Play movie={trailerMovie} />} />
                <Route path={'/home'} render={() => userGenres && <MoviesGenres userGenres={userGenres} movieGenres={movieGenres} lang={lang} onItem={handleRetrieve} onFav={handleFav}  favs={favs} />} />
            </Switch>
        </main>
    }
}

export default withRouter(Home)