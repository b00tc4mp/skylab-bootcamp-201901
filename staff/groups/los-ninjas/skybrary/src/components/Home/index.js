import React, { Component } from 'react'
import logic from '../../logic'
import Search from '../Search'
import Results from '../Results'
import { booleanLiteral } from '@babel/types';
// import Detail from '../Detail'

class Home extends Component {
    state = {error: null, books: [], }

    handleSearch = query => 
    
        logic.searchBooks(query)
            .then((books) =>
                this.setState({books: books.docs})
        ).catch(error =>
            this.setState({ error: error.message })
        )
        
    

    render() {

        const {
            handleSearch,
            state: {books}
        } = this

        return <main>
            <h2>Hello World</h2>
            <button>Logout</button>
            <Search onSearch={handleSearch}/>
            <Results items={books}/>
        </main>
    }
}

export default Home