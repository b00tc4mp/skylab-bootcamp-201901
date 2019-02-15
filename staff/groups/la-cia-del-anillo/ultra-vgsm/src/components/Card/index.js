import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './index.css';

import logic from '../../logic';
import Favorite from '../Favorite';

class Card extends Component {

    // myHandleImageLoadEvent = Event => {
    //     console.log(Event.target);
    //     Event.target.parentElement.parentElement.style.opacity = '1';
    // }

    render() {

        const {
            props: { game, gameUrl, favorites }
        } = this;
               
        const linkGame = '/game/' + { gameUrl }.gameUrl;
        const linkPlatform = '/platform/' + game.platform.id;

        return (
            <article className="card">
                <div
                    onClick={() => this.props.history.push(linkGame)}
                    className="card__image-content"
                >
                    {logic.userLoggedIn && (
                        <div className="card__favorite">
                            <Favorite idGame={game.id} favorites={favorites} />
                        </div>
                    )}
                    {game.boxart ? (
                        <img
                            className="card__image"
                            src={game.base_url.thumb + game.boxart.filename}
                            alt=""
                            // onLoad={(event) => this.myHandleImageLoadEvent(event)}
                        />
                    ) : (
                        <img className="card__image" src="/images/thinking.svg" alt="" />
                    )}
                </div>
                <header>
                    <h3 className="card__title">
                        <Link
                            to={linkGame}
                            className="card__title-link"
                            title="The Legend of Zelda: Ocarina of Time"
                        >
                            {game.game_title}
                        </Link>
                    </h3>
                    <h4 className="card__platform">
                        <Link
                            to={linkPlatform}
                            className="card__title-link"
                            title="The Legend of Zelda: Ocarina of Time"
                        >
                            {game.platform.name}
                        </Link>
                    </h4>
                </header>
            </article>
        );
    }
}

export default withRouter(Card);
