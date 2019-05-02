import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Genres from '../SelectGenres'
import Nav from '../Nav'
import Name from '../Name'
import Search from '../Search'
import Results from '../Results'
import Pagination from '../Pagination'
import MoviesGenres from '../MoviesGenres'
import Detail from '../Detail'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'


class Home extends Component {
    state = { movies: [], error: null, userNameGenre: null}

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
                , error: null, query: null}))
                .catch(error => {
                    this.setState({ error: error.message })
                })
        } catch(error) {
            this.setState({ error: error.message })
        }
    }

    handleSearchPage = (query, page) => {
        try {
            logic.searchMoviesWithPage(query, page)
                .then(response => this.setState({
                    movies: response.results.map(({ id, title, poster_path: image }) => {
                        let imagePath
                        if(image) imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                        else imagePath = 'https://via.placeholder.com/300x450'                       
                        return { id, title, image: imagePath }
                    })
                , error: null, query: null}))
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

    render() {
        const {
            props: { lang, onLogout },
            state: { movies, movieGenres, userGenres, fullname, error, page, total_pages },
            handleSearch,
            handleSearchPage,
            handleOnChangeGenres
        } = this

        // const { hello } = literals[lang]

        return <main>
            {userGenres && <Nav lang={lang} /*onList={handleList} onProfile={handleProfile} */ onLogout={onLogout} />}
            
            <Name lang={lang} name={fullname} />
            
            {!userGenres && movieGenres && <Genres lang={lang} genres={movieGenres} onUpdate={handleOnChangeGenres}/>}

            {userGenres && <Search lang={lang} onSearch={handleSearch} /> }

            <Results lang={lang} items={movies} error={error} />

            {/* <Pagination page={page} total_pages={total_pages} onSearch={handleSearchPage}/> */}
            
            {/* esconder cuando busque pelis */}
            {userGenres && <MoviesGenres userGenres={userGenres} movieGenres={movieGenres} lang={lang} />}
        </main>
    }
}

export default Home