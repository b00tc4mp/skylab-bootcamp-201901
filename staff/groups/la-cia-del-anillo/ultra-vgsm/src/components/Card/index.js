import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';

class Card extends Component {
    render() {

        const { props: { game }} = this;

        return (
            <article className="card">
                <a href="#home">
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
                </a>
                <header>
                    <h3 className="card__title">
                        <a
                            href="#home"
                            className="card__title-link"
                            title="The Legend of Zelda: Ocarina of Time"
                        >
                            {game.game_title}
                        </a>
                    </h3>
                    <h4 className="card__platform">{game.platform.name}</h4>
                </header>
            </article>
        );
    }
}

export default Card;
