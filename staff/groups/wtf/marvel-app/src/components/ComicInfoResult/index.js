'use strict'

import React, { Component } from 'react';
import logic from '../Logic'
import PaintComic from '../PaintComic'

class ComicInfoResult extends Component {

    state = { comic: null, feedback: null }

    componentWillMount() {
        const { props: { id } } = this

        this.handleComicSelected(id)
    }

    componentWillReceiveProps(nextProps) {    
        const { id } = nextProps

        this.handleComicSelected(id)
    }

    handleComicSelected = id => {
        try {
            logic.retrieveComic(id)
                .then(comic => {
                    this.setState({comic: comic.results[0], feedback: null})
                })
                .catch(({ message }) => this.setState({ feedback: message, comic: null }))
        } catch ({ message }) {
            this.setState({ feedback: message, comic: null })
        }
    }

    render() {
        const { state:{comic, feedback}, props: {onCharacterSelected} } = this;

        return <PaintComic results={comic} feedback={feedback} onItemClick={onCharacterSelected} />
    }
}

export default ComicInfoResult;