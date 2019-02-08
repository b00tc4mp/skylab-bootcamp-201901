import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './index.css'

import logic from '../../logic'
import DevelopersInfo from '../DevelopersInfo'
import GenresInfo from '../GenresInfo'
import PublishersInfo from '../PublishersInfo'


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
            logic.retrieveImages(img.toString())
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
        
        const { state : { baseUrl, logoUrl, fanartUrl},
                props : { name, genId, releaseDate, platformUrl, platformName, players, coop, devId, pubId } 
        } = this

        console.log(baseUrl)
        console.log(logoUrl)
        const logoTotalUrl = (baseUrl)+(logoUrl)
        const fanartFullUrl = (baseUrl)+(fanartUrl)

        return(
            <Fragment>
                {fanartUrl && logoUrl && (
                    <div className="banner" style={{backgroundImage: "url(" + fanartFullUrl +")", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
                        <div className="banner__title">
                            <img className="banner__title--shadow" src={logoTotalUrl} alt="Clear logo of the game" />
                        </div>
                        <div className="banner__details">
                            <p>
                            <GenresInfo genId = {genId} /> 
                            {releaseDate ? ' '+releaseDate+' // ' : ''}
                            <Link className="gameInfo__link" to={platformUrl}> {platformName}</Link>{' //'}
                            {players ? ' Players : '+players+' // ' : ''}
                            {coop ? ' Coop : '+coop+' ' : ''}
                            <DevelopersInfo devId = {devId}/> 
                            <PublishersInfo pubId = {pubId} />
                            </p>
                        </div>
                    </div>
                )}
                {fanartUrl && !logoUrl && (
                    <div className="banner" style={{backgroundImage: "url(" + fanartFullUrl +")", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
                        <div className="banner__title">
                            <h1 className="gameInfo__titleGame">{name}</h1>
                        </div>
                        <div className="banner__details">
                            <p>
                            <GenresInfo genId = {genId} /> 
                            {releaseDate ? ' '+releaseDate+' // ' : ''}
                            <Link className="gameInfo__link" to={platformUrl}> {platformName}</Link>{' //'}
                            {players ? ' Players : '+players+' // ' : ''}
                            {coop ? ' Coop : '+coop+' ' : ''}
                            <DevelopersInfo devId = {devId}/> 
                            <PublishersInfo pubId = {pubId} />
                            </p>
                        </div>
                    </div>
                )}
                
                {!fanartUrl && logoUrl && (
                    <div className="banner">
                        <div className="banner__title">
                            <img className="banner__title--shadow" src={logoTotalUrl} alt="Clear logo of the game" />
                        </div>
                        <div className="banner__details">
                            <p>
                            <GenresInfo genId = {genId} /> 
                            {releaseDate ? ' '+releaseDate+' // ' : ''}
                            <Link className="gameInfo__link" to={platformUrl}> {platformName}</Link>{' //'}
                            {players ? ' Players : '+players+' // ' : ''}
                            {coop ? ' Coop : '+coop+' ' : ''}
                            <DevelopersInfo devId = {devId}/> 
                            <PublishersInfo pubId = {pubId} />
                            </p>
                        </div>
                    </div>
                )}
                {!fanartUrl && !logoUrl && (
                    <div className="banner">
                        <div className="banner__title">
                            <h1 className="gameInfo__titleGame">{name}</h1>
                        </div>
                        <div className="banner__details">
                            <p>
                            <GenresInfo genId = {genId} /> 
                            {releaseDate ? ' '+releaseDate+' // ' : ''}
                            <Link className="gameInfo__link" to={platformUrl}> {platformName}</Link>{' //'}
                            {players ? ' Players : '+players+' // ' : ''}
                            {coop ? ' Coop : '+coop+' ' : ''}
                            <DevelopersInfo devId = {devId}/> 
                            <PublishersInfo pubId = {pubId} />
                            </p>
                        </div>
                    </div>
                )}
            </Fragment>
        )


                /* <div className="banner__details">
                    <p>
                    <GenresInfo genId = {genId} /> 
                    {releaseDate ? ' '+releaseDate+' // ' : ''}
                    <Link className="gameInfo__link" to={platformUrl}> {platformName}</Link> //
                    {players ? ' Players : '+players+' // ' : ''}
                    {coop ? ' Coop : '+coop+' ' : ''}
                    <DevelopersInfo devId = {devId}/> 
                    <PublishersInfo pubId = {pubId} />
                    </p>
                </div> */

        /* <div className="gameInfo__details">
                    <p>
                    <GenresInfo genId = {genres} /> 
                    {releaseDate ? ' '+releaseDate+' // ' : ''}
                    <Link className="gameInfo__link" to={platformUrl}> {platformName}</Link> //
                    {players ? ' Players : '+players+' // ' : ''}
                    {coop ? ' Coop : '+coop+' ' : ''}
                    <DevelopersInfo devId = {developers}/> 
                    <PublishersInfo pubId = {publishers} />
                    </p>
                </div> */

        // if (this.state.fanartUrl) {
        //     if (this.state.logoUrl) {
        //         return (
        //             <div style={{backgroundImage: "url(" + fanartFullUrl +")", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
        //                 <img src={logoTotalUrl} alt="Clear logo of the game" />
        //             </div>
        //         )}
        
        //         return( <h1 className="gameInfo__titleGame">{this.props.name}</h1> )
        // }
        // if (this.state.logoUrl) {
        // return (
        //     <img src={logoTotalUrl} alt="Clear logo of the game" />
        // )}

        // return( <h1 className="gameInfo__titleGame">{this.props.name}</h1> )
    }
}

export default GameTitle