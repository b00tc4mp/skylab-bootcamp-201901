import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./index.sass";

import logic from "../../logic";

const { REACT_APP_THUMB: gameCover } = process.env;

const Card = ({ key, game, history }) => {

    return (
        <article className='card'>
            <div>
                <Link to={`/game/${game.id}`}>{game.game_title}</Link>
            </div>
            <div className='card__image' onClick={() => history.push(`/game/${game.id}`)}>
                <img className='card__image' src={`${gameCover}${game.boxartUrl}`} alt={game.game_title} />
            </div>
            <div>{game.finalScore && Math.round(game.finalScore * 20)}</div>
        </article>
    );
};

export default withRouter(Card);
