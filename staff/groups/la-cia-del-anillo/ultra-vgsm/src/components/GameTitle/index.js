'use stric'

import React, { Component } from 'react';
import logic from '../../logic'

class GameTitle extends Component {
    state = { baseUrl: null, logoUrl: null }

    componentDidMount() {
        if (this.props.gamId) this.handleClearLogo(this.props.gamId);
    }

    componentWillReceiveProps(nextProps){
        this.handleClearLogo(nextProps)
    }

    handleClearLogo = img => {
        try {
            logic.retrieveImages(img.gamId.toString())
                .then( ({ data : { base_url: { original }, images } }) => {
                    const imgCat = images[this.props.gamId].find(image => image.type === 'clearlogo')
                    this.setState({ baseUrl: original,
                                    logoUrl: (imgCat ? imgCat.filename : null)
                    })
                })
            } catch ({ message }) {
            this.setState({ feedback: message });
        }
    }

    render() {
        
        console.log(this.state.baseUrl)
        console.log(this.state.logoUrl)
        const url = (this.state.baseUrl)+(this.state.logoUrl)
        
        if (this.state.logoUrl) {
        return (
            <img src={url} alt="Clear logo of the game" />
        )}

        return( <h1 className="gameInfo__titleGame">{this.props.name}</h1> )
    }
}

export default GameTitle