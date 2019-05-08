import React, { Component } from 'react'
import Results from '../Results'
import NameGenre from '../NameGenre'
import logic from '../../logic';


class MoviesGenres extends Component {
    state = { movies: [], error: null, nameGenre: null, favs: [] }

    componentDidMount() {
        const { props: { movieGenres, userGenres } } = this
        const result = movieGenres.find(genre => genre.id === userGenres);
        this.setState({ nameGenre: result.name })

        logic.retrieveUser()
            .then(({ genres }) => {
                Promise.all([logic.retrieveMoviesWithGenre(genres), logic.retrieveMovieUserList()])
                    .then(([response, favs]) => this.setState({
                        movies: response.results.map(({ id, title, poster_path: image }) => {
                            let imagePath
                            if (image) imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                            else imagePath = 'https://via.placeholder.com/300x450'
                            return { id, title, image: imagePath }
                        })
                        , error: null, favs
                    }))
                    .catch(error => {
                        this.setState({ error: error.message })
                    })
            })
            .catch(error => this.setState({ error: error.message }))
    }

    render() {
        const {
            props: { lang, onItem , onFav, favs},
            state: { movies, error, nameGenre }
        } = this

        return <main>
            <NameGenre nameGenre={nameGenre} />
            <Results lang={lang} items={movies} onItem={onItem} error={error} favs={favs} onFav={onFav} />
        </main>
    }
}

export default MoviesGenres