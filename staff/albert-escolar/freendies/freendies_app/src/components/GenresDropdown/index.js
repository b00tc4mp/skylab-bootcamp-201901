import React, { Component } from 'react'
import './index.scss'

class GenresDropdown extends Component {
    state = {
        toggleGenres: false,
    }


    toggleGenresHandler = (event) => {
        event.preventDefault()
        const { toggleGenres } = this.state
        this.setState({ toggleGenres: !toggleGenres })
    }

    onSearchGenre = (event) => {
        event.preventDefault()
        const{onSearchByGenre}=this.props
        const genreClicked = event.target.text.toLowerCase()
        onSearchByGenre(genreClicked)

    }

    render() {

        const { toggleGenres} = this.state
        const { toggleGenresHandler, onSearchGenre } = this
        return <div className="Genres">
            <button className="Genres__button" onClick={toggleGenresHandler}>Categories</button>
            {toggleGenres && <ul className="Genres__list">
                    <li className="Genres__listItems">
                        <a onClick={onSearchGenre}>any</a>
                    </li>
                    <li className="Genres__listItems">
                        <a onClick={onSearchGenre}>action</a>
                    </li>
                    <li className="Genres__listItems">
                        <a onClick={onSearchGenre}>platforms</a>
                    </li>
                    <li className="Genres__listItems">
                        <a onClick={onSearchGenre}>shooter</a>
                    </li>
                    <li className="Genres__listItems">
                        <a onClick={onSearchGenre}>adventure</a>
                    </li>
                    <li className="Genres__listItems">
                        <a onClick={onSearchGenre}>sports</a>
                    </li>
                </ul>}
        </div>
    }
}

export default GenresDropdown