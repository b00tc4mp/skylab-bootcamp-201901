'use stric'

import React, { Component } from 'react';
import logic from '../../logic'

class PublishersInfo extends Component {
    state = { pubName: null }

    componentDidMount() {
        if (this.props.pubId) this.handlePublishersList(this.props.pubId);
    }

    componentWillReceiveProps(nextProps){
        this.handlePublishersList(nextProps)
    }

    handlePublishersList = pub => {
        try {
            logic.retrievePublishersList(pub)
                .then( ({ data: { publishers }}) => {
                    this.setState({ pubName: publishers[this.props.pubId].name })
                })
            } catch ({ message }) {
            this.setState({ feedback: message });
        }
    }

    render() {
        return (
            <span>
                {this.state.pubName}
            </span>
        )
    }
}

export default PublishersInfo