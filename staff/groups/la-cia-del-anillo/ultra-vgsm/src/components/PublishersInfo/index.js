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
                    const pubCat = publishers[this.props.devId]
                    this.setState({ pubName: (pubCat && pubCat.name) ? pubCat.name : null })
                })
            } catch ({ message }) {
            this.setState({ feedback: message });
        }
    }

    render() {
        if (this.state.devName) {
            return (<span>{'// Publisher: '}{this.state.pubName}</span>
            )
        }
        return ( <fragment></fragment>)
    }
}

export default PublishersInfo