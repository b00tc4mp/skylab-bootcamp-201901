import React, { Component } from 'react'
import CharacterInfoResult from '../CharacterInfoResult'
import SearchResults from '../SearchResults'
import logic from '../../Logic'


export default class Search extends Component {

    state = { query: 'avengers', characters: null, feedback: null, character: null, searching: null}

    componentDidMount(){
        this.handleSearch()
    };

    componentDidUpdate(prevProps, prevState){
        (this.state.query !== prevState.query) && this.handleSearch()
    }

    handleSearch = () => {
        try {
            this.setState({ feedback: null, searching: true, characters: null, character: null })
            logic.searchCharacter(this.state.query)
                .then(({results}) => {this.setState({ searching: null, feedback: null, characters: results.map(({ id, name, thumbnail: {path,extension} }) => ({id, name, path, extension}))})})
                .catch(({ message }) => this.setState({ feedback: message, searching: null, characters: null }))
        } catch ({ message }) {
            this.setState({ feedback: message, searching: null,characters: null })
        }
    }

    handleCharacterSelected = id => {
        try {
        logic.retrieveCharacter(id)
            .then(el => this.setState({character: el.results[0]}))
            .catch(({ message }) => { this.setState({character: null, message}) })
        } catch ({ message }) { this.setState({character: null, message}) }
    }

    render() {

        const { handleSearch, handleCharacterSelected, state: {characters, character, feedback, searching} } = this

        return <section className="margin-top">
        <div className="columns is-mobile is-centered">
            <div className="column"> 
                <form onSubmit={(e) => {e.preventDefault(); handleSearch()}} className="field has-addons has-addons-centered">
                    <div className="control has-icons-left is-expanded">
                        <input onChange={e => this.setState({query: e.target.value})} className="input is-small is-rounded" placeholder="Look for your character!" type="text" name="query"></input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-bolt"></i>
                        </span>
                    </div>
                    <div className="control">
                        <button className="button is-small is-rounded is-warning"type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
        <SearchResults characters={characters} searching={searching} feedback={feedback} onCharacterSelected={handleCharacterSelected} />
        <CharacterInfoResult character={character}/>
    </section>
    }
}