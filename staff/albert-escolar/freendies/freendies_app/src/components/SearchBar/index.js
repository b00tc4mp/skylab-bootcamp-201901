import React, { Component } from 'react'
import './index.scss'

class SearchBar extends Component {
    state = {
        title: '',
        genre: 'Any'

    }

    onSubmit = (event) => {
        event.preventDefault()
        let { title, genre } = this.state
        title = title.toLowerCase()
        genre = genre.toLowerCase()

        this.props.onSearch(genre, title)

    }


    render() {
        const { onSubmit, props: { onSearch } } = this
        return <form className="Search" onSubmit={onSubmit}>
            <select className="Search__categoriesButton" required name="genre" onChange={event => { event.preventDefault(); this.setState({ genre: event.target.value }) }}>
                <option value="Any">Any</option>
                <option value="Action">Action</option>
                <option value="Platforms">Platforms</option>
                <option value="Shooter">Shooter</option>
                <option value="Adventure">Adventure</option>
                <option value="Sports">Sports</option>
            </select>
            <input className="Search__inputBox" name="title" placeholder="Make your search..." type="text" onChange={event => { event.preventDefault(); this.setState({ title: event.target.value }) }} />
            <button className="Search__button fas fa-search"></button>
        </form>


    }

}

export default SearchBar