import React, { Component } from 'react';
import logic from '../../logic';
import Card from '../Card';

class Games extends Component {
    state = { games: null };

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
        logic
            .retrieveGamesByPlatform(platformId)
            .then(({ data }) => this.setState({ games: data.games }))
            .catch(error => console.log(error))
    };

    
    render() {
        
        return (
            <div className="container">
                <section className="results content">
                    {this.state.games &&
                        this.state.games.map(game => {
                            return <Card key={game.id} gameUrl={game.id} game={game} />
                        })}
                </section>
            </div>
        );
    }
}

export default Games;
