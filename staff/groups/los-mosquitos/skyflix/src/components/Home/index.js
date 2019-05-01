import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Nav from '../Nav'
import Search from '../Search'
import Results from '../Results'
import Detail from '../Detail'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'


class Home extends Component {
    state = { movies: [], error: null }

    handleSearch = query => {
        logic.searchMovies(query)
            .then(response => this.setState({
                movies: response.results.map(({ id, title, poster_path: image }) => {
                    const imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                    return { id, title, image: imagePath }
                })
            }))
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    render() {
        const {
            props: { lang, name, onLogout },
            state: { movies },
            handleSearch,
        } = this

        const { hello } = literals[lang]

        return <main>
            <Nav lang={lang} /*onList={handleList} onProfile={handleProfile} */ onLogout={onLogout} />
            <h1>{hello}, {name}!</h1>
            <Search lang={lang} onSearch={handleSearch} />
            <Results lang={lang} items={movies} />
        </main>
    }
}

export default Home