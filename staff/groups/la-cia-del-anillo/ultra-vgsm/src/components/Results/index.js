import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import './index.css';

import logic from '../../logic';
import Card from '../Card';

const masonryOptions = {
    transitionDuration: 0,
    gutter: 20
};

class Results extends Component {
    state = { results: null, feedback: null };

    handleSearch = query => {
        try {
            logic
                .searchGame(query, 'boxart,platform')
                .then(({ data: { games }, include: { boxart, platform } }) => {
                    this.setState({
                        results: games.map(game => {
                            game.base_url = boxart.base_url;
                            game.boxart = boxart.data[game.id].find(
                                image => image.side === 'front'
                            );
                            game.platform = platform[game.platform];
                            return game;
                        })
                    });
                })
                .catch(({ message }) => this.setState({ feedback: message }));
        } catch ({ message }) {
            this.setState({ feedback: message });
        }
    };

    getPlatform = platformId => {
        try {
            logic
                .retrieveGamesByPlatform(platformId, 'boxart,platform')
                .then(({ data: { games }, include: { boxart, platform } }) => {
                    this.setState({
                        results: games.map(game => {
                            game.base_url = boxart.base_url;
                            game.boxart = boxart.data[game.id].find(
                                image => image.side === 'front'
                            );
                            game.platform = platform.data[game.platform];
                            return game;
                        })
                    });
                })
                .catch(({ message }) => this.setState({ feedback: message }));
        } catch ({ message }) {
            this.setState({ feedback: message });
        }
    };

    componentDidMount() {
        const {
            match: {
                params: { query = '', platformId = null }
            }
        } = this.props;

        if (platformId) this.getPlatform(platformId);
        if (query !== '') this.handleSearch(query);
    }

    componentWillReceiveProps(nextProps) {
        const {
            match: {
                params: { query = '', platformId = null }
            }
        } = nextProps;

        if (platformId) this.getPlatform(platformId);
        if (query !== '') this.handleSearch(query);
    }

    render() {
        const {
            state: { results }
        } = this;

        

        return (
            <Masonry
                className={'results content'} 
                elementType={'section'} 
                options={masonryOptions} 
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
            >
                {results && (
                    results.map(game => {
                        return <Card key={game.id} gameUrl={game.id} game={game} />;
                    })
                )}
            </Masonry>
        );
    }
}

export default Results;
