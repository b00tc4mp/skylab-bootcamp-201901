import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import "./index.sass";

import logic from "../../logic";

const {
    REACT_APP_THUMB: gameCover,
    REACT_APP_NOT_FOUND_IMAGE_URL: NOT_FOUND_IMAGE_URL
} = process.env;

const Card = ({ key, game, history }) => {
    console.log(game);
    return (
        <article className="card">
            <div
                className="card__image"
                onClick={() => history.push(`/game/${game.id}`)}
            >
                {game.boxartUrl ? (
                    <img
                        className="card__image card__image--shadow"
                        src={`${gameCover}${game.boxartUrl}`}
                        alt={game.game_title}
                    />
                ) : (
                    <img
                        className="card__image card__image--shadow"
                        src={NOT_FOUND_IMAGE_URL}
                        alt={game.game_title}
                    />
                )}

                {game.finalScore && (
                    <Fragment>
                        <div className="card__image card__image--corner" />

                        <div>
                            <p className="card__finalScore">
                                {game.finalScore &&
                                    Math.round(game.finalScore * 20)}
                            </p>
                        </div>
                    </Fragment>
                )}
            </div>

            <div>
                <Link to={`/game/${game.id}`}>{game.game_title}</Link>
            </div>

            <div>
                <p className="card__platform">{game.platformName}</p>
            </div>
        </article>
    );
};

export default withRouter(Card);
