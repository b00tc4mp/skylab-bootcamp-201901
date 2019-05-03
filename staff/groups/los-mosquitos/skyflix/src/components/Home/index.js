import React, { Component } from 'react'
import logic from '../../logic'
import Genres from '../SelectGenres'
import Nav from '../Nav'
import Name from '../Name'
import Search from '../Search'
import Results from '../Results'
import MoviesGenres from '../MoviesGenres'
import Detail from '../Detail'
import Play from '../Play'
import List from '../List'
import './index.sass'

import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

class Home extends Component {
    state = { movies: [], error: null, trailerMovie: null, userNameGenre: null, favs: [], movieList: [] }


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
                        , error: null, favs
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
        Promise.all([logic.retrieveUser(),logic.retrieveMovieUserList()])
            .then(([{ fullname, genres }, favs]) => {
                state.userGenres = genres
                state.fullname = fullname
                this.setState({favs})
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
    }

    handletoMovie = (id) => {
        logic.retrieveTrailer(id)
            .then(({ id, results: [{ key }] }) => {
                const videoKey = `https://www.youtube.com/embed/${key}`
                this.setState({ trailerMovie: videoKey }, () => this.props.history.push('/home/movies/detail/' + id + '/trailer'))
            })

    }

    handleHome = () => {
        logic.retrieveMovieUserList()
            .then(favs => this.setState({favs}, () => this.props.history.push('/home')) )
    }

    handleList = () => {
        logic.retrieveMovieUserList()
            .then(movieList => {
                this.setState( {movieList} , () => this.props.history.push('/home/list'))})
    }

    handleFav = (id) => {
        logic.toggleMovieUserList(id)
            .then(() => logic.retrieveMovieUserList())
            .then(favs => this.setState({ favs }))
    }

    handleRemoveItem = id => {
        logic.removeFromMovieUserList(id)
            .then(() => logic.retrieveMovieUserList()
            .then(movieList => this.setState( {movieList})))
    }

    render() {
        const {
            props: { lang, onLogout },
            state: { movies, movie, movieList, trailerMovie, movieGenres, userGenres, fullname, error, favs },
            handleSearch,
            handleRetrieve,
            handletoMovie,
            handleOnChangeGenres,
            handleHome,
            handleFav,
            handleList,
            handleRemoveItem
        } = this

        return <main>
            {userGenres && <Nav lang={lang} onList={handleList} /*onProfile={handleProfile} */ onLogout={onLogout} onHome={handleHome} />}
            <Name lang={lang} name={fullname} />
            
            {userGenres && <Search lang={lang} onSearch={handleSearch} />}
            
            {!userGenres && movieGenres && <Genres lang={lang} genres={movieGenres} onUpdate={handleOnChangeGenres} />}
            
            <Switch>
                <Route exact path="/home" render={() => userGenres && <MoviesGenres userGenres={userGenres} movieGenres={movieGenres} lang={lang} onItem={handleRetrieve} onFav={handleFav} favs={favs} />} />
                
                <Route path={'/home/list'} render={() => <List movieList={movieList} onItem={handleRetrieve} onRemoveItem={handleRemoveItem}/>} />

                <Route exact path="/home/movies" render={() => <Results lang={lang} items={movies} onItem={handleRetrieve} error={error} onFav={handleFav} favs={favs} />} />
                
                <Route exact path="/home/movies/detail/:id" render={() => <Detail item={movie} toMovie={handletoMovie} onFav={handleFav} favs={favs} />} />
                
                <Route path={"/home/movies/detail/:id/trailer"} render={() => <Play movie={trailerMovie} />} />

                
                
            </Switch>
        </main>
    }
}

export default withRouter(Home)