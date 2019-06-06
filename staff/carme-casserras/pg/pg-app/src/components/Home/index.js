import React, { Component } from 'react'
import logic from '../../logic'
import CategorySearch from '../Categorysearch'
import CategoryResults from '../Categoryresults'

import './index.sass'

import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

class Home extends Component {
    state = { query: null, error: null, things: [] }


    handleSearchCategory = query =>
        Promise.All(logic.searchByCategory(query))
            .then(([things, favs]) =>
                this.setState({ things: things.map(({ status, category, description, loc }) => ({ status, category, description, loc })), favs })
            )
            .catch(error =>
                this.setState({ error: error.message })
            )
    render() {
        const {
            handleSearchCategory,            
            state: { things },           
        } = this
       

        return <main className="home">
            <CategorySearch onSearch={handleSearchCategory} />
            <CategorySearch items={things} />

        </main>
    }
}
    export default Home