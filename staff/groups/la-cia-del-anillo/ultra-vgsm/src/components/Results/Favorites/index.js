import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import logic from '../../../logic';
import NoResults from '../../NotFound';
import Results from '../index';

class Favorites extends Component {
    state = {
        results: [],
        favorites: [],
        loading: true
    };

    _updateGamesAftersearch = ({ data: { games }, include: { boxart, platform }, pages }) => {
        this.setState({
            loading: false,
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

    getFavoritesPage = () => {
        if (logic.userLoggedIn) {
            logic.retrieveUser().then(({ favorites }) => {
                // this.setState({ loading: false });
                try {
                    // favorites.length > 0 &&
                        logic
                            .retrieveGame(favorites.join(','), '', 'boxart,platform')
                            .then(response => {
                                this._updateGamesAftersearch(response);
                            })
                            .catch(({ message }) => this.setState({ feedbackResult: message }));
                } catch ({ message }) {
                    this.setState({loading: false});
                    this.setState({ feedbackResult: message });
                }
            });
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

    toggleFeedback = prop => {
        this.setState({
            feedbackResult: prop
        });
    };

    componentDidMount() {
        this.getFavoritesPage();
        this.getFavorites();
    }

    componentWillReceiveProps() {
        this.getFavoritesPage();
        this.getFavorites();
    }

    render() {
        const {
            state: { results, favorites, loading }
        } = this;
       
        if (loading) {
            return (
                <div className="loading">
                    <i className="fas fa-sync fa-spin" />
                </div>
            );
        } else if (results.length > 0) {
            return <Results results={results} favorites={favorites} loading={false} />;
        } else {
            return <NoResults />;
        }
    }
}

export default withRouter(Favorites);
