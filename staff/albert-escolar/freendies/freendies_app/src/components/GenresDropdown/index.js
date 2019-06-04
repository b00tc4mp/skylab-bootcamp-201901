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
        return <div>
            <button onClick={toggleGenresHandler}>Categories</button>
            {toggleGenres && <div>
                <ul>
                    <li>
                        <a onClick={onSearchGenre}>any</a>
                    </li>
                    <li>
                        <a onClick={onSearchGenre}>action</a>
                    </li>
                    <li>
                        <a onClick={onSearchGenre}>platforms</a>
                    </li>
                    <li>
                        <a onClick={onSearchGenre}>shooter</a>
                    </li>
                    <li>
                        <a onClick={onSearchGenre}>adventure</a>
                    </li>
                    <li>
                        <a onClick={onSearchGenre}>sports</a>
                    </li>
                </ul>
            </div>}
        </div>
    }
}

export default GenresDropdown