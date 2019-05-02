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
    state = { error: null, books: [], bookDetail: null, bookInfo: {}, favs: [] }

    handleSearch = query =>
        logic.searchBooks(query)
            .then((books) =>

                this.setState({ bookDetail: null, books: books.docs })
            ).catch(error =>
                this.setState({ error: error.message })
            )

    handleLogout = () => {
        logic.logoutUser()
        this.props.history.push('/')
    }

    handleRetrieve = (isbn, key) => {
        console.log(this.state.books)
        // buscamos el libro del que se ha hecho click, entre todos los libros que tenemos en el state
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
                    publish_date: publish_date[0]
                }

                this.setState({ bookDetail })
            }).catch()
    }


    handleFav = isbn =>
        logic.toggleFavBook(isbn[0])
            .then(() => logic.retrieveFavBooks())
            .then(favs => this.setState({ favs }))


    // logic.retrieveBook(isbn)
    //     .then((details) => {
    //         const bookDetails = Object.values(details)
    //         console.log([bookDetails[0].details])
    //         this.setState({bookDetail: [bookDetails[0].details]})
    //     }).catch()


    render() {

        const {
            handleLogout,
            handleSearch,
            handleRetrieve,
            state: { books, bookDetail, favs },
            handleFav
        } = this

        return <main className="home">
            <Header onLogout={handleLogout} />
            <Search onSearch={handleSearch} />
            {!bookDetail && <Results items={books} onItem={handleRetrieve} onFav={handleFav} favs={favs}/>}
            {bookDetail && <Detail item={bookDetail} />}
            <Footer />
        </main>
    }
}

export default Home