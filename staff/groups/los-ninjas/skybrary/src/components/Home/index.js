import React, { Component } from 'react'
import logic from '../../logic'
import Search from '../Search'
import Results from '../Results'
import Header from '../Header'
import Footer from '../Footer'

// import { booleanLiteral } from '@babel/types';
import Detail from '../Detail'
import './index.scss'

class Home extends Component {
    state = {error: null, books: [], bookDetail: null}

    handleSearch = query =>
        logic.searchBooks(query)
            .then((books) =>
                this.setState({ bookDetail: null, books: books.docs})
        ).catch(error =>
            this.setState({ error: error.message })
        )

    handleRetrieve = (isbn) =>
        logic.retrieveBook(isbn)
            .then((details) => {
                const bookDetails = Object.values(details)
                console.log([bookDetails[0].details])
                this.setState({bookDetail: [bookDetails[0].details]})
            }).catch()


    render() {

        const {
            handleSearch,
            handleRetrieve,
            state: {books, bookDetail}
        } = this

        return <main className="home">
            <Header/>
            <Search onSearch={handleSearch}/>
            {!bookDetail && <Results items={books} onItem={handleRetrieve}/>}
            {bookDetail  && <Detail item={bookDetail}/>}
            <Footer/>
        </main>
    }
}

export default Home