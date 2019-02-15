import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './index.css';

import logic from '../../logic';
import GameTitle from '../GameTitle'
import Favorite from '../Favorite'

import Loading from '../Loading';

class GameInfo extends Component {
    state = {
        id: null,
        name: null,
        releaseDate: null,
        platform: null,
        players: null,
        overview: null,
        coop: null,
        youtube: null,
        developers: null,
        genres: null,
        publishers: null,
        imageBaseUrlOriginal: null,
        imageFilename: null,
        platformName: null,
        feedback: null,
        favorites: [],
        loading: true

    };


    componentDidMount() {
        const {
            match: {
                params: { gameId }
            }
        } = this.props;
        
        if (gameId) this.handleGameInfo(gameId);
    }

    componentWillReceiveProps(nextProps){
        const {
            match: {
                params: { gameId }
            }
        } = nextProps;

        this.handleGameInfo(gameId)
    }

    handleGameInfo = gameId => {
        
            logic
                .retrieveGame(
                    gameId,
                    'players,publishers,genres,overview,last_updated,rating,platform,coop,youtube,os,processor,ram,hdd,video,sound,alternates',
                    'boxart,platform'
                )
                .then(
                    ({
                        data: {
                            games: [
                                {
                                    id,
                                    game_title,
                                    release_date,
                                    platform,
                                    players,
                                    overview,
                                    coop,
                                    youtube,
                                    developers,
                                    genres,
                                    publishers
                                }
                            ]
                        },
                        include: {
                            boxart: {
                                base_url: { original },
                                data
                            },

                            platform: { data: dataPlatform }
                        }
                    }) => {
                        this.setState({
                            id: id,
                            name: game_title,
                            releaseDate: release_date,
                            platform: platform,
                            players: players,
                            overview: overview,
                            coop: coop,
                            youtube: youtube,
                            developers: developers,
                            genres: genres,
                            publishers: publishers,
                            imageBaseUrlOriginal: original,
                            imageFilename: data[id].find(image => image.side === 'front').filename,
                            platformName: dataPlatform[platform].name,
                            loading: false
                        });
                    }
                ).then(this.getFavorites())
                .catch(({ message }) => this.setState({ feedback: message }));
        }

    getFavorites = () => {
        logic.userLoggedIn && logic.retrieveUser().then(({favorites}) => {
            this.setState({
                favorites
            });
        });
    };

    render() {
        const {
            state: {
                id,
                name,
                releaseDate,
                platform,
                players,
                overview,
                coop,
                youtube,
                developers,
                genres,
                publishers,
                imageBaseUrlOriginal,
                imageFilename,
                platformName,
                feedback,
                favorites,
                loading
            }
        } = this;

        const opts = {
            // height: '195',
            width: '100%',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };

        const imageUrl =
            { imageBaseUrlOriginal }.imageBaseUrlOriginal + { imageFilename }.imageFilename;
        const platformUrl = "/platform/" + platform

        if (feedback !== null) {
            return (<h2>{feedback}</h2>)
        }
        console.log(favorites)
        
        if(loading) {
            return <Loading />
        }
       return (
            <section className="gameInfo">
                <div className="gameInfo__title">
                    <GameTitle  gamId = {id} 
                                name = {name}
                                genId = {genres}
                                releaseDate = {releaseDate}
                                platformUrl = {platformUrl}
                                players = {players}
                                coop = {coop}
                                devId = {developers}
                                pubId = {publishers}
                                platformName = {platformName}
                                />
                </div>
                {logic.userLoggedIn && (
                        <div className="gameInfo__favorite">
                            <Favorite idGame={this.props.match.params.gameId} favorites={favorites} />
                        </div>
                    )}
                <div className="gameInfo__image">
                    <img className="gameInfo__image--modifier" width="100%" alt="Frontboxart of game" src={imageUrl} />
                </div>
                <div className="gameInfo__overview">
                    <p>{overview}</p>
                </div>
                <div className="gameInfo__video" >
                    {youtube ? <YouTube videoId={youtube} opts={opts} onReady={this._onReady}/> : ''}
                </div>
            </section>
        );
    }
}

export default GameInfo;
