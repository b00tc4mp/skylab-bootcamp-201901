import React, { Component } from 'react'
import './index.scss'

class SearchBar extends Component {
    state = {

    }

    render() {

        return <div>
            <form>
                <input name="searchedItem" placeholder="Make your search..." type="text"></input>
                <button>Search</button>
            </form>
        </div>

    }

}

export default SearchBar