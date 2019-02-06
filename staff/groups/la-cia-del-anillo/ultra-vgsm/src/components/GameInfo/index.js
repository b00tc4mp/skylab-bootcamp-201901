import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './index.css';

import logic from '../../logic';
import DevelopersInfo from '../DevelopersInfo'
import GenresInfo from '../GenresInfo'
import PublishersInfo from '../PublishersInfo'
import GameTitle from '../GameTitle'


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
        platformName: null
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
                            platformName: dataPlatform[platform].name
                        });
                    }
                )
                .catch(({ message }) => this.setState({ feedback: message }));
        } 

    render() {
        const {
            state: {
                id,
                name,
                releaseDate,
                players,
                overview,
                coop,
                youtube,
                developers,
                genres,
                publishers,
                imageBaseUrlOriginal,
                imageFilename,
                platformName
            }
        } = this;

        const opts = {
            height: '195',
            width: '320',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };

        const imageUrl =
            { imageBaseUrlOriginal }.imageBaseUrlOriginal + { imageFilename }.imageFilename;
        return (
            <section className="gameInfo">
                
                <GameTitle gamId = {id} name = {name} />
                
                <img width="200px" alt="Frontboxart of game" src={imageUrl} />
                <h3>Release date: {releaseDate}</h3>
                <h4>Platform: {platformName}</h4>
                <h5>Players: {players}</h5>
                <h6>Coop: {coop}</h6>
                <p>{overview}</p>
                <p> Developers: <DevelopersInfo devId = {developers}/> </p>
                <p>    genres: <GenresInfo genId = {genres} /> </p>
                <p>   publishers: <PublishersInfo pubId = {publishers} />          </p>
                <YouTube videoId={youtube} opts={opts} onReady={this._onReady} />
            </section>
        );
    }
}

export default GameInfo;
