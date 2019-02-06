import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Card extends Component {
    render() {

        const { props: { game, gameUrl }} = this;
        const linkGame = "/game/"+{gameUrl}.gameUrl
        return (
            <article className="card">
                <Link to={linkGame}>
                    <div>
                        {
                            game.boxart 
                                ? (<img
                                    className="card__image"
                                    src={game.base_url.thumb + game.boxart.filename}
                                    alt=""
                                />)
                                : (<img
                                    className="card__image"
                                    src="/images/thinking.svg"
                                    alt=""
                                />)
                        }
                        
                    </div>
                </ Link>
                <header>
                    <h3 className="card__title">
                        <Link to={linkGame}
                            className="card__title-link"
                            title="The Legend of Zelda: Ocarina of Time"
                        >
                            {game.game_title}
                        </Link>
                    </h3>
                    <h4 className="card__platform">{game.platform.name}</h4>
                </header>
            </article>
        );
    }
}

export default Card;
