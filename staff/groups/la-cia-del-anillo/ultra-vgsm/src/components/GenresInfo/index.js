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
                    this.setState({ genName: genres[this.props.genId].name })
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