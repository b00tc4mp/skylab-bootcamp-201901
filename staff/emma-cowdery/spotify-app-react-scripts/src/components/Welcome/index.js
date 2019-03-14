import React, { Component } from 'react'
import './index.sass'


class Welcome extends Component {
    state = { username: '', query: '', firstLetter: '' }

    handleSearchInput = event => this.setState({ query: event.target.value })

    handleSearchFormSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {
        const { handleSearchFormSubmit } = this

        return <section className="welcome">
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h2 className="subtitle">Search</h2>
                    </div>
                    <div className="level-item">
                        <form onSubmit={handleSearchFormSubmit} className="field has-addons">
                            <p className="control">
                                <input onChange={this.handleSearchInput} className="input level-item" type="text" name="query" placeholder="search artist..." />
                            </p>
                            <p className="control">
                                <button className="button is-link is-inverted is-outlined level-item" type="submit" id="button-addon2"><i className="fas fa-search"></i></button>
                            </p>
                        </form>
                    </div>
                </div>
            </nav>
        </section>
    }
}

export default Welcome

