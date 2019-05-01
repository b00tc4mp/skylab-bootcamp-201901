import React, { Component } from 'react'
import logic from '../../logic'
import Search from '../Search'
import Results from '../Results'
import Header from '../Header'
import Footer from '../Footer'

import { booleanLiteral } from '@babel/types';
// import Detail from '../Detail'
import './index.scss'

class Home extends Component {
    state = { error: null, books: [], }

    handleSearch = query =>

        logic.searchBooks(query)
            .then((books) =>
                this.setState({ books: books.docs })
            ).catch(error =>
                this.setState({ error: error.message })
            )

    handleLogout = () => {
        logic.logoutUser()
        this.props.history.push('/')

    }


    render() {

        const {
            handleSearch,
            state: { books },
            handleLogout
        } = this

        return <main className="home">
            <Header onLogout={handleLogout} />
            <Search onSearch={handleSearch} />
            <Results items={books} />
            <Footer />
        </main>
    }
}

export default Home