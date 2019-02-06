import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import './index.css';

import logic from '../../logic';
import Card from '../Card';

const masonryOptions = {
    transitionDuration: 0,
    gutter: 20
};

class Results extends Component {
    state = { results: null, favorites: [], feedback: null };

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

    getFavorites = () => {
        logic.userLoggedIn && logic.retrieveUser().then(({favorites}) => {
            this.setState({
                favorites
            });
        });
    };

    componentDidMount() {
        const {
            match: {
                params: { query = '', platformId = null }
            }
        } = this.props;

        if (platformId) this.getPlatform(platformId);
        if (query !== '') this.handleSearch(query);

        this.getFavorites();
    }

    componentWillReceiveProps(nextProps) {
        const {
            match: {
                params: { query = '', platformId = null }
            }
        } = nextProps;

        if (platformId) this.getPlatform(platformId);
        if (query !== '') this.handleSearch(query);

        this.getFavorites();
    }

    render() {
        const {
            state: { results, favorites }
        } = this;

        return (
            <Masonry
                className={'results content'}
                elementType={'section'}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
            >
                {results &&
                    results.map(game => {
                        return (
                            <Card
                                key={game.id}
                                gameUrl={game.id}
                                favorites={favorites}
                                game={game}
                            />
                        );
                    })}
            </Masonry>
        );
    }
}

export default withRouter(Results);
