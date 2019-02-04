'use strict'

import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './index.sass';
import Search from '../Search';
import CharactersResults from '../CharactersResults'

class Home extends Component {

    handleSearch = query => {
        this.props.history.push(`/home/search/${query}`)
    }; 

    render() {

        const { handleSearch, handleCharacterSelected } = this

        return <HashRouter>
                    <section className='Home'>
                        <header>
                            <h1>Marvel-App</h1>
                        </header>
                        <Search onSearch={handleSearch}/>
                        <Route path="/home/search/:query" render={props => <CharactersResults query={props.match.params.query} onCharacterSelected={handleCharacterSelected} />} />
                        
                    </section>
                </HashRouter>
    }
}

export default Home;