'use strict'

import React, { Component } from 'react';
import { HashRouter, Route, withRouter, Switch} from 'react-router-dom';
import './index.sass';
import Search from '../Search';
import CharactersResults from '../CharactersResults'
import CharacterInfoResult from '../CharacterInfoResult'
import ComicInfoResult from '../ComicInfoResult'
import Favourites from '../Favourites'
import TopCharacters from '../Top Characters'
import TopComics from '../Top Comics'
import logic from '../Logic';


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

    handleToHome = (event) => { 
        event.preventDefault()
        this.props.history.push('/home/search/')
    }

    handleToFavourites = (event) => { 
        event.preventDefault()
        this.props.history.push('/home/search/user/favourites/')}

    handleToUser = (event) => {
        event.preventDefault()
        this.props.history.push('/home/user/')
    }

    handleLogOut = (event) => {
        event.preventDefault() 
        logic.logout()
        this.props.history.push('/')
    }
    
    handleItemChosen = id => {
        this.props.history.push(`/home/search/character/${id}`)
        this.setState({characterId: id})
    }

    render() {

        const { handleSearch, handleCharacterSelected, handleComicSelected, handleToHome, handleToFavourites, handleLogOut, handleItemChosen} = this

        return <HashRouter>
        <section className="margin-top">
            <nav className="header level">
                <p className="level-item has-text-centered">
                    <a onClick={(event) =>  handleToHome(event)} href="#" className="button is-small is-black is-rounded"><i class="fas fa-home"></i>&nbsp;&nbsp;Home</a>
                </p>
                <p className="level-item has-text-centered">
                    <a onClick={(event) =>  handleToFavourites(event)} href="#" className="button is-small is-black is-rounded"><i class="fas fa-bolt"></i>&nbsp;&nbsp;Favourites</a>
                </p>
                <p className="level-item has-text-centered">
                    <img src="https://images.vectorhq.com/images/previews/cd8/marvel-logo-psd-444569.png" alt="" className="header__logo"/>
                </p>
                <p className="level-item has-text-centered">
                    <a target="_blanck "href="https://www.youtube.com/channel/UCvC4D8onUfXzvjTOM-dBfEA" className="button is-small is-black is-rounded"><i class="fab fa-youtube"></i>&nbsp;&nbsp;Youtube Channel</a>
                </p>
                <p className="level-item has-text-centered">
                    <a onClick={(event) =>  handleLogOut(event)} href="#" className="button is-small is-black is-rounded"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Log out</a>
                </p>
            </nav>
            <Search onSearch={handleSearch}/>
            <Route exact path="/home/search/" render={()=> <TopCharacters onCharacterSelected={handleCharacterSelected} />} />
            <Route exact path="/home/search/" render={()=> <TopComics onComicSelected={handleComicSelected} />} />
            <Route exact path="/home/search/:query" render={props => <CharactersResults query={props.match.params.query} onCharacterSelected={handleCharacterSelected} />} />
            <Route exact path="/home/search/character/:id" render={props => <CharacterInfoResult id={props.match.params.id} onComicSelected={handleComicSelected} />} />
            <Route exact path="/home/search/comic/:id" render={props => <ComicInfoResult id={props.match.params.id} onCharacterSelected={handleCharacterSelected} />} />
            <Route exact path="/home/search/user/favourites/" render={() => <Favourites handleToHome={handleToHome} handleItemChosen={handleItemChosen}/>} />
        </section>
    </HashRouter>
    }
}

export default withRouter(Home);