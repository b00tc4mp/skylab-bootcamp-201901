import React, { Component } from 'react';
import logic from '../../logic';
import Card from '../Card';

class Platforms extends Component {
    state = { results: null };

    componentDidMount() {
        const {
            match: {
                params: { platformId }
            }
        } = this.props;
        if (platformId) this.getPlatform(platformId);
    }

    componentWillReceiveProps(nextProps){
        const {
            match: {
                params: { platformId }
            }
        } = nextProps;
        this.getPlatform(platformId)
    }

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

    render() {
        return (
            <div className="container">
                <section className="results content">
                    {this.state.results &&
                        this.state.results.map(game => {
                            return <Card key={game.id} game={game} />;
                        })}
                </section>
            </div>
        );
    }
}

export default Platforms;
