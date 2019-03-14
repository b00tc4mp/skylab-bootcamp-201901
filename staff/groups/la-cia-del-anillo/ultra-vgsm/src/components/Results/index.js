import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import './index.css';

import logic from '../../logic';
import Card from '../Card';
import Feedback from '../Feedback';
import NoResults from '../NoResults';
import Loading from '../Loading';

const masonryOptions = {
    transitionDuration: 0,
    gutter: 20
};

class Results extends Component {
    state = {
        results: [],
        favorites: [],
        feedbackResult: null,
        nextButton: false,
        loading: true
    };

    _updateGamesAftersearch = ({ data: { games }, include: { boxart, platform }, pages }) => {
        this.setState({
            loading: false,
            nextButton: pages.next !== this.state.nextButton ? pages.next : false,
            results: games.map(game => {
                game.base_url = boxart.base_url;

                game.platform = platform.data
                    ? platform.data[game.platform]
                    : platform[game.platform];

                game.boxart = boxart.data[game.id].find(image => image.side === 'front');
                return game;
            })
        });
    };

    loadMoreGame = nextButton => {
        try {
            logic
                .searchGameByUrl(nextButton)
                .then(({ data: { games }, include: { boxart, platform }, pages }) => {
                    games &&
                        games.map(game => {
                            game.base_url = boxart.base_url;
                            game.boxart = boxart.data[game.id].find(
                                image => image.side === 'front'
                            );
                            game.platform = platform.data
                                ? platform.data[game.platform]
                                : platform[game.platform];
                            return game;
                        });

                    this.setState({
                        nextButton: pages.next !== this.state.nextButton ? pages.next : false,
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
                .then(response => {
                    this._updateGamesAftersearch(response);
                })
                .catch(({ message }) => {
                    this.setState({ feedbackResult: message });
                });
        } catch ({ message }) {
            this.setState({ feedbackResult: message });
        }
    };

    getPlatform = platformId => {
        try {
            logic
                .retrieveGamesByPlatform(platformId, 'boxart,platform')
                .then(response => {
                    this._updateGamesAftersearch(response);
                })
                .catch(({ message }) => {
                    this.setState({ feedbackResult: message });
                });
        } catch ({ message }) {
            this.setState({ feedbackResult: message });
        }
    };

    getFavorites = () => {
        try {
            logic.userLoggedIn &&
                logic.retrieveUser().then(({ favorites }) => {
                    this.setState({
                        favorites
                    });
                });
        } catch ({ message }) {
            this.setState({ feedbackResult: message });
        }
    };

    getFavoritesPage = () => {
        if (logic.userLoggedIn) {
            logic.retrieveUser().then(({ favorites }) => {
                try {
                    favorites.length > 0 &&
                        logic
                            .retrieveGame(favorites.join(','), '', 'boxart,platform')
                            .then(response => {
                                this._updateGamesAftersearch(response);
                            })
                            .catch(({ message }) => this.setState({ feedbackResult: message }));
                } catch ({ message }) {
                    this.setState({ feedbackResult: message });
                }
            });
        }
    };

    toggleFeedback = prop => {
        this.setState({
            feedbackResult: prop
        });
    };

    componentDidMount() {
        const {
            loading = true,
            results = [],
            favorites = [],
            match: {
                params: { query = '', platformId = null }
            }
        } = this.props;
        
        this.setState({
            loading,
            results,
            favorites,
            nextButton: false
        });
        if (platformId) this.getPlatform(platformId);
        if (query !== '') this.handleSearch(query);
        // if (favoritesSearch) this.getFavoritesPage();
        this.getFavorites();
    }

    componentWillReceiveProps(nextProps) {
        const {
            loading = true,
            results = [],
            favorites = [],
            match: {
                params: { query = '', platformId = null }
            }
        } = nextProps;

        this.setState({
            loading,
            results,
            favorites,
            nextButton: false
        });

        if (platformId) this.getPlatform(platformId);
        if (query !== '') this.handleSearch(query);
        // if (favoritesSearch) this.getFavoritesPage();
        this.getFavorites();
    }

    handleImagesLoaded = imagesLoadedInstance => {
        imagesLoadedInstance.images.forEach(image => {
            if (image.isLoaded) image.img.parentElement.parentElement.style.opacity = '1';
        });
    };

    render() {
        const {
            toggleFeedback,
            state: { loading, nextButton, results, favorites, feedbackResult }
        } = this;

        console.log(loading, results.length);

        if (loading && results.length <= 0) {
            //Loading...
            return (
                <Loading />
            );
        } else if (!loading && results.length <= 0) {
            //No results
            return <NoResults />;
        }

        return (
            <Fragment>
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
                {results && nextButton && (
                    <button className="load-more" onClick={() => this.loadMoreGame(nextButton)}>
                        Load more
                    </button>
                )}

                {feedbackResult && (
                    <Feedback message={feedbackResult} toggleFeedback={toggleFeedback} />
                )}
            </Fragment>
        );
    }
}

export default withRouter(Results);
