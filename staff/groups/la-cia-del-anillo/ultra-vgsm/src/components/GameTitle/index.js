'use stric'

import React, { Component } from 'react';
import './index.css'

import logic from '../../logic'


class GameTitle extends Component {
    state = { baseUrl: null, logoUrl: null, fanartUrl: null }

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
                    const clrLogo = images[this.props.gamId].find(image => image.type === 'clearlogo')
                    const fanArt = images[this.props.gamId].find(image => image.type === 'fanart')
                    this.setState({ baseUrl: original,
                                    logoUrl: ((clrLogo && clrLogo.filename) ? clrLogo.filename : null),
                                    fanartUrl: ((fanArt && fanArt.filename) ? fanArt.filename : null)
                    })
                })
            } catch ({ message }) {
            this.setState({ feedback: message });
        }
    }

    render() {
        
        console.log(this.state.baseUrl)
        console.log(this.state.logoUrl)
        const logoTotalUrl = (this.state.baseUrl)+(this.state.logoUrl)
        const fanartFullUrl = (this.state.baseUrl)+(this.state.fanartUrl)
        console.log(fanartFullUrl)
        if (this.state.fanartUrl) {
            if (this.state.logoUrl) {
                return (
                    <div style={{backgroundImage: "url(" + fanartFullUrl +")", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
                        <img src={logoTotalUrl} alt="Clear logo of the game" />
                    </div>
                )}
        
                return( <h1 className="gameInfo__titleGame">{this.props.name}</h1> )
        }
        if (this.state.logoUrl) {
        return (
            <img src={logoTotalUrl} alt="Clear logo of the game" />
        )}

        return( <h1 className="gameInfo__titleGame">{this.props.name}</h1> )
    }
}

export default GameTitle