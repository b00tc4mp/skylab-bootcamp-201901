import React, { Component } from 'react';
import logic from '../../logic';

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
                            return (
                                <article className="card" key={game.id}>
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                {game.game_title}
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">{game.platform}</h4>
                                    </header>
                                </article>
                            );
                        })}
                </section>
            </div>
        );
    }
}

export default Games;
