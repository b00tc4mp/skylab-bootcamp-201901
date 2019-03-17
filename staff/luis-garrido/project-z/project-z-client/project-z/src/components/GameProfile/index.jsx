import React, { Fragment, useState, useEffect } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";

import Review from "../Review";
import WriteReview from "../WriteReview";

const { REACT_APP_THUMB: gameCover } = process.env;

const GameProfile = ({
    match: {
        params: { gameId }
    }
}) => {
    const [gameInfo, setGameInfo] = useState(undefined);
    const [username, setUsername] = useState("");

    useEffect(() => {
        logic.isUserLoggedIn && getUsernameLogged();
        retrieveGameInfo(gameId);
    }, [gameId]);

    const retrieveGameInfo = async gameId =>
        setGameInfo(await logic.retrieveGameInfo(gameId));

    const getUsernameLogged = async () => {
        const user = await logic.retrieveUserInfo();
        setUsername(user.username);
    };

    console.log(gameInfo);

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">GAME PROFILE</h1>
                </div>
                {gameInfo && (
                    <div className="results">
                        <img
                            src={`${gameCover}${gameInfo.boxartUrl}`}
                            alt={gameInfo.game_title}
                        />
                        <h2>title: {gameInfo.game_title}</h2>
                        <p>overview: {gameInfo.overview}</p>
                        <h2>
                            finalScore:{" "}
                            {gameInfo.finalScore ? (
                                Math.round(gameInfo.finalScore * 20)
                            ) : (
                                <p>Not rated yet, be the first!</p>
                            )}
                        </h2>
                        <p>coop: {gameInfo.coop}</p>
                        <p>developers: {gameInfo.developers}</p>
                        <p>genres: {gameInfo.genres}</p>
                        <p>platform: {gameInfo.platform}</p>
                        <p>players: {gameInfo.players}</p>
                        <p>publishers: {gameInfo.publishers}</p>
                        
                        {logic.isUserLoggedIn ? (
                            gameInfo.reviews.some(
                                review => (review.author !== null && review.author.username === username)
                            ) ? (
                                <div />
                            ) : (
                                <div>
                                    <h2>Write Review</h2>
                                    <WriteReview
                                        gameInfo={gameInfo}
                                        refresh={retrieveGameInfo}
                                        gameId={gameId}
                                    />
                                </div>
                            )
                        ) : (
                            <div>
                                <Link to="/login">
                                    Login to write a comment
                                </Link>
                            </div>
                        )}

                        {gameInfo.reviews && !!gameInfo.reviews.length && (
                            <div>
                                <h2>Reviews</h2>
                                {gameInfo.reviews.reverse().map(review => (
                                    <Review
                                        key={review._id}
                                        review={review}
                                        printFrom={"gameProfile"}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default GameProfile;
