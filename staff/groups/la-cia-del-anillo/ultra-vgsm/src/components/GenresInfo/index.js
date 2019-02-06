'use stric'

import React, { Component } from 'react';
import logic from '../../logic'

class GenresInfo extends Component {
    state = { genName: null }

    componentDidMount() {
        if (this.props.genId) this.handleGenresList(this.props.genId);
    }

    componentWillReceiveProps(nextProps){
        this.handleGenresList(nextProps)
    }

    handleGenresList = gen => {
        try {
            logic.retrieveGenresList(gen)
                .then( ({ data: { genres }}) => {
                    const genCat = genres[this.props.devId]
                    this.setState({ genName: (genCat && genCat.name) ? genCat.name : null })
                })
            } catch ({ message }) {
            this.setState({ feedback: message });
        }
    }

    render() {
        return (
            <span>
                {this.state.genName}
            </span>
        )
    }
}

export default GenresInfo