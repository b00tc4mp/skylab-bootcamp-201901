import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';

import logic from '../../logic';
import Card from '../Card';

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

    // shouldComponentUpdate(nextProps) {
    //     console.log(3)
    //     return true;
    // }

    componentDidMount() {
        const {
            query
        } = this.props.match.params;

        this.handleSearch(query);
    }

    componentWillReceiveProps(props) {
        const {
            query
        } = props.match.params;

        this.handleSearch(query);
    }

    render() {
        const {
            state: { results }
        } = this;

        return (
            <section className="results content">
                {results &&
                    results.map(game => {
                        return <Card key={game.id} game={game} />;
                    })}
            </section>
        );
    }
}

export default Results;
