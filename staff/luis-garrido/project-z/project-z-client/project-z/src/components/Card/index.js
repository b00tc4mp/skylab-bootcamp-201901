import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./index.sass";

import logic from "../../logic";

const { REACT_APP_THUMB: gameCover, REACT_APP_NOT_FOUND_IMAGE_URL: NOT_FOUND_IMAGE_URL } = process.env;

const Card = ({ key, game, history }) => {

    return (
        <article className='card'>
            <div className='card__image' onClick={() => history.push(`/game/${game.id}`)}>
                {game.boxartUrl
                    ? <img className='card__image' src={`${gameCover}${game.boxartUrl}`} alt={game.game_title} />
                    : <img className='card__image' src={NOT_FOUND_IMAGE_URL} alt={game.game_title} />
                }
            </div>
            <div>
                <Link to={`/game/${game.id}`}>{game.game_title}</Link>
            </div>
            <div><p>{game.platform}</p></div>
            <div>{game.finalScore && Math.round(game.finalScore * 20)}</div>
        </article>
    );
};

export default withRouter(Card);
