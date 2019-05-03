import React, { Component } from 'react'
import logic from '../../logic'
import Search from '../Search'
import Results from '../Results'
import Header from '../Header'
import Footer from '../Footer'
import Detail from '../Detail'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import './index.scss'

class Home extends Component {
    state = { query: null, error: null, books: [], bookDetail: null, bookInfo: {}, bookFavs: [] }

    componentWillReceiveProps(props) {
        if (props.location.search) {
            const { query } = queryString.parse(props.location.search)

            query && this.search(query)
        }
    }

    search = query =>
        logic.searchBooks(query)
            .then((books) =>
                logic.retrieveFavBooks()
                .then(bookFavs => {
                    this.setState({ query, bookFavs, bookDetail: null, books: books.docs })
                })
            ).catch(error =>
                this.setState({ error: error.message })
            )

    handleSearch = query => this.props.history.push(`/home?query=${query}`)

    handleRetrieve = (isbn, key) => {
        const singleBook = this.state.books.find(book => book.key === key)

        const { cover_i, title, author_name = [], publish_date = [] } = singleBook

        logic.retrieveBook(isbn)
            .then(apiBookDetailsResponse => {
                const { details = {} } = Object.values(apiBookDetailsResponse)[0]
                const { description = {}, number_of_pages } = details
                const { value = '' } = description
                const bookDetail = {
                    author_name,
                    cover: cover_i,
                    description: value,
                    numberOfPages: number_of_pages,
                    title,
                    publish_date: publish_date[0],
                    isbn,
                }

                // console.log(btoa(JSON.stringify(bookDetail))) // atob to decript!

                this.setState({ bookDetail, isbn })
            }).catch()
    }

    handleFav = isbn =>
         logic.toggleFavBook(isbn)
            .then(() => logic.retrieveFavBooks())
            .then(bookFavs => this.setState({ bookFavs }))

    handleLogout = () => {
        logic.logoutUser()
        this.props.history.push('/')
    }

    render() {
        const {
            handleLogout,
            handleSearch,
            handleRetrieve,
            state: { query, books, bookDetail, bookFavs },
            handleFav
        } = this

        return <main className="home">
            <Header onLogout={handleLogout} />
            <Search query={query} onSearch={handleSearch} />
            {!bookDetail && <Results items={books} onItem={handleRetrieve} onFav={handleFav} bookFavs={bookFavs}/>}
            {bookDetail && <Detail item={bookDetail} onFav={handleFav} bookFavs={bookFavs} />}
            <Footer />
        </main>
    }
}

export default withRouter(Home)