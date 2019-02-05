'use strict'

import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './index.sass';
import Search from '../Search';
import CharactersResults from '../CharactersResults'
import CharacterInfoResult from '../CharacterInfoResult'
import ComicInfoResult from '../ComicInfoResult'
import Favourites from '../Favourites'

class Home extends Component {

    state = {characterId: null, comicId: null}

    handleSearch = query => this.props.history.push(`/home/search/${query}`)

    handleCharacterSelected = id => {
        this.setState({
            characterId: id
        }, () => this.props.history.push(`/home/search/character/${id}`))
    }

    handleComicSelected = id => {
        this.setState({
            comicId: id
        }, () => this.props.history.push(`/home/search/comic/${id}`))
    }

    render() {

        const { handleSearch, handleCharacterSelected, handleComicSelected } = this

        return <HashRouter>
                    <section className='Home'>
                        <header>
                            <h1>Marvel-App</h1>
                        </header>
                        <Search onSearch={handleSearch}/>
                        <Route exact path="/home/search/:query" render={props => <CharactersResults query={props.match.params.query} onCharacterSelected={handleCharacterSelected} />} />
                        <Route exact path="/home/search/character/:id" render={props => <CharacterInfoResult id={props.match.params.id} onComicSelected={handleComicSelected} />} />
                        <Route exact path="/home/search/comic/:id" render={props => <ComicInfoResult id={props.match.params.id} onCharacterSelected={handleCharacterSelected} />} />
                    </section>
                </HashRouter>
    }
}

export default Home;