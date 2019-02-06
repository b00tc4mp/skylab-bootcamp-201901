'use stric'

import React, { Component } from 'react';
import logic from '../../logic'

class DevelopersInfo extends Component {
    state = { devName: null }

    componentDidMount() {
        if (this.props.devId) this.handleDevelopersList(this.props.devId);
    }

    componentWillReceiveProps(nextProps){
        this.handleDevelopersList(nextProps)
    }

    handleDevelopersList = dev => {
        try {
            logic.retrieveDevelopersList(dev)
                .then( ({ data: { developers }}) => {
                    const devCat = developers[this.props.devId]
                    this.setState({ devName: (devCat && devCat.name) ? devCat.name : null })
                })
            } catch ({ message }) {
            this.setState({ feedback: message });
        }
    }

    render() {
        return (
            <span>
                {this.state.devName}
            </span>
        )
    }
}

export default DevelopersInfo