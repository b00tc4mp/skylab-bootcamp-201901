'use strict'

import React, { Component } from 'react';
import logic from '../Logic';

class CharactersResults extends Component {

    state = { characters: null, feedback: null }

    componentDidMount() {
        console.log('mounted')

        const { props: { query } } = this

        this.handleSearch(query)
    }

    componentWillReceiveProps(props) {
        console.log('props changed')
        
        const { query } = props

        this.handleSearch(query)
    }

    handleSearch = query => {
        try {
            logic.searchCharacter(query)
                .then(characters => {
                    this.setState({
                        characters: characters.map(({ id, name }) => ({ id, name }))
                    })
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {

        //const { state:{characters, feedback}, props: {onCharacterSelected} } = this;

        return <section className='characters results'>
                        <header>
                            <h1>CharactersResults</h1>
                        </header>
                </section>
    }
}

export default CharactersResults;