import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./index.sass";

const {
    REACT_APP_THUMB: gameCover,
    REACT_APP_NOT_FOUND_IMAGE_URL: NOT_FOUND_IMAGE_URL
} = process.env;

const RankingCard = ({ index, game, history }) => {
    const cardClass =
        index % 2 === 0
            ? "ranking-card ranking-card--background-even"
            : "ranking-card";

    return (
        <article
            className={cardClass}
            onClick={() => history.push(`/game/${game.id}`)}
        >
            <div className="ranking-card__position">
                <p>{index}</p>
            </div>
            <div
                className="ranking-card__image-container"
                onClick={() => history.push(`/game/${game.id}`)}
            >
                {game.boxartUrl ? (
                    <img
                        className="ranking-card__image"
                        src={`${gameCover}${game.boxartUrl}`}
                        alt={game.game_title}
                    />
                ) : (
                    <img
                        className="ranking-card__image"
                        src={NOT_FOUND_IMAGE_URL}
                        alt={game.game_title}
                    />
                )}
            </div>
            <div className="ranking-card__info">
                <div>
                    <Link to={`/game/${game.id}`}>{game.game_title}</Link>
                </div>
                <div className="ranking-card__info--platform">
                    <p>{game.platformName}</p>
                </div>
            </div>
            <div>
                <p className="ranking-card__final-score">
                    {game.finalScore && Math.round(game.finalScore * 20)}
                </p>
            </div>
        </article>
    );
};

export default withRouter(RankingCard);
