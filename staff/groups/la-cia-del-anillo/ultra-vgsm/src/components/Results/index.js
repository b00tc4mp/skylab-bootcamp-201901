import React, { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import './index.css';

import logic from '../../logic';
import Card from '../Card';
import Feedback from '../Feedback';
import NoResults from '../NoResults';

const masonryOptions = {
    transitionDuration: 0,
    gutter: 20
};

class Results extends Component {
    state = { 
        results: null, 
        favorites: [], 
        feedbackResult: null,
        nextButton: false

    };

    loadMoreGame = nextButton => {
        try {
            logic
                .searchGameByUrl(nextButton)
                .then(({ data: { games }, include: { boxart, platform }, pages }) => {
                    const {
                        match: {
                            params: { query = '' }
                        }
                    } = this.props;
                   
                    games && games.map(game => {
                        game.base_url = boxart.base_url;
                        game.boxart = boxart.data[game.id].find(image => image.side === 'front');
                        game.platform =
                            query === '' ? platform.data[game.platform] : platform[game.platform];
                        return game;
                    });

                    this.setState({
                        nextButton: (pages.next !== this.state.nextButton) ? pages.next : false,
                        results: [...this.state.results, ...games]
                    });
                })
                .catch(({ message }) => this.setState({ feedbackResult: message }));
        } catch ({ message }) {
            this.setState({ feedbackResult: message });
        }
    };

    handleSearch = query => {
        try {
            logic
                .searchGame(query, 'boxart,platform')
                .then(({ data: { games }, include: { boxart, platform }, pages }) => {
                    this.setState({
                        nextButton: pages.next,
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
                .catch(({ message }) => this.setState({ feedbackResult: message }));
        } catch ({ message }) {
            this.setState({ feedbackResult: message });
        }
    };

    getPlatform = platformId => {
        try {
            logic
                .retrieveGamesByPlatform(platformId, 'boxart,platform')
                .then(({ data: { games }, include: { boxart, platform }, pages }) => {
                    this.setState({
                        nextButton: pages.next,
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
                .catch(({ message }) => this.setState({ feedbackResult: message }));
        } catch ({ message }) {
            this.setState({ feedbackResult: message });
        }
    };

    getFavorites = () => {
        logic.userLoggedIn &&
            logic.retrieveUser().then(({ favorites }) => {
                this.setState({
                    favorites
                });
            });
    };

    getFavoritesPage = () => {
        logic.userLoggedIn && logic.retrieveUser().then(({favorites}) => {
            try {
                favorites.length > 0 && logic
                    .retrieveGame(favorites.join(','), '', 'boxart,platform')
                    .then(({ data: { games }, include: { boxart, platform }, pages }) => {
                        this.setState({
                            nextButton: pages.next,
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
                    .catch(({ message }) => this.setState({ feedbackResult: message }));
            } catch ({ message }) {
                this.setState({ feedbackResult: message });
            }
        });
    };

    toggleFeedback = (prop) => {
        this.setState({
            feedbackResult: prop
        });
    };

    componentDidMount() {
        const {
            favoritesSearch = false,
            match: {
                params: { query = '', platformId = null }
            }
        } = this.props;

        if (platformId) this.getPlatform(platformId);
        if (query !== '') this.handleSearch(query);
        if (favoritesSearch) this.getFavoritesPage();
        this.getFavorites();
    }

    componentWillReceiveProps(nextProps) {
        const {
            favoritesSearch = false,
            match: {
                params: { query = '', platformId = null }
            }
        } = nextProps;

        if (platformId) this.getPlatform(platformId);
        if (query !== '') this.handleSearch(query);
        if (favoritesSearch) this.getFavoritesPage();
        this.getFavorites();
    }

    handleImagesLoaded = (imagesLoadedInstance) => {
        imagesLoadedInstance.images.map(image => {
            if(image.isLoaded) image.img.parentElement.parentElement.style.opacity = '1';
        }) 
    }

    render() {
        const {
            toggleFeedback,
            state: { loading, nextButton, results, favorites, feedbackResult }
        } = this;
        console.log(results);
        return (
            <Fragment>
                {results === null && <NoResults />}
                <Masonry
                    className={'results content'}
                    elementType={'section'}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                    onImagesLoaded={this.handleImagesLoaded}
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
                {
                    (nextButton) && (<button className="load-more" onClick={() => this.loadMoreGame(nextButton)}>Load more</button>)
                }
                {feedbackResult && <Feedback message={feedbackResult} toggleFeedback={toggleFeedback} />}
            </Fragment>
        );
    }
}

export default withRouter(Results);
