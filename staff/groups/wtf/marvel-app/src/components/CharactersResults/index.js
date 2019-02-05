'use strict'

import React, { Component } from 'react';
import logic from '../Logic';
import MultipleResults from '../MultipleResults'

class CharactersResults extends Component {

    state = { characters: null, feedback: null }
    
    componentWillMount() {
        const { props: { query } } = this

        this.handleSearch(query)
    }

    componentWillReceiveProps(nextProps) {    
        const { query } = nextProps

        this.handleSearch(query)
    }


    handleSearch = query => {
        try {
            logic.searchCharacter(query)
                .then(characters => {
                    const {results} = characters

                    this.setState({
                        feedback: null,
                        characters: results.map(({ id, name, thumbnail: {path,extension} }) => ({id, name, path, extension}))
                    })
                })
                .catch(({ message }) => this.setState({ feedback: message, characters: null }))
        } catch ({ message }) {
            this.setState({ feedback: message, characters: null })
        }
    }

    render() {

        const { state:{characters, feedback}, props: {onCharacterSelected} } = this;

        return  <MultipleResults results={characters} feedback={feedback} onItemClick={onCharacterSelected}/>

    }
}

export default CharactersResults;