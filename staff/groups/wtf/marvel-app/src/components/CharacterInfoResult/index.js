'use strict'

import React, { Component } from 'react';
import logic from '../Logic'
import PaintCharacter from '../PaintCharacter'

class CharacterInfoResult extends Component {

    state = { character: null, feedback: null }

    componentWillMount() {
        const { props: { id } } = this

        this.handleCharacterSelected(id)
    }

    componentWillReceiveProps(nextProps) {    
        const { id } = nextProps

        this.handleCharacterSelected(id)
    }

    handleCharacterSelected = id => {
        try {
            logic.retrieveCharacter(id)
                .then(character => {
                    this.setState({character: character.results[0], feedback: null})
                })
                .catch(({ message }) => this.setState({ feedback: message, character: null }))
        } catch ({ message }) {
            this.setState({ feedback: message, character: null })
        }
    }



    render() {
        const { state:{character, feedback}, props: {onComicSelected} } = this;

        return <PaintCharacter results={character} feedback={feedback} onItemClick={onComicSelected} />
    }
}

export default CharacterInfoResult;