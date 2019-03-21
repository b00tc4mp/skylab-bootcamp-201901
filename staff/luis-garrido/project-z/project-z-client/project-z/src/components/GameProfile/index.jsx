import React, { Fragment, useState, useEffect } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logic from "../../logic";

import Review from "../Review";
import WriteReview from "../WriteReview";

const {
    REACT_APP_THUMB: gameCover,
    REACT_APP_NOT_FOUND_IMAGE_URL: NOT_FOUND_IMAGE_URL
} = process.env;

const GameProfile = ({
    history,
    match: {
        params: { gameId }
    }
}) => {
    const [gameInfo, setGameInfo] = useState(undefined);
    const [username, setUsername] = useState("");
    const [preScore, setPreScore] = useState("");

    useEffect(() => {
        logic.isUserLoggedIn && getUsernameLogged();
        retrieveGameInfo(gameId);
    }, [gameId]);

    useEffect(() => {
        logic.isUserLoggedIn && gameInfo && getPreScore();
    }, [gameInfo]);

    // const retrieveGameInfo = async gameId => {
    //     const _gameInfo = await logic.retrieveGameInfo(gameId);
    //     setGameInfo(_gameInfo);
    // };

    const retrieveGameInfo = async gameId => {
        try {
            logic
                .retrieveGameInfo(gameId)
                .then(res => setGameInfo(res))
                .catch(({ message }) => {
                    // notify("No results found!")
                    history.push("/noresults");
                });
        } catch (error) {
            // notify(error.message);
            history.push("/noresults");
        }
    };

    const notify = message => {
        toast.dismiss();
        toast.error(message);
    };

    const getPreScore = async () => {
        let _preScore = await logic.getPreScore(gameId, gameInfo);
        _preScore = Math.round(Number(_preScore) * 100);
        if (_preScore > 100) _preScore = 100;
        if (_preScore > 50) setPreScore(`${_preScore}% recommended for you`);
    };

    const getUsernameLogged = async () => {
        const user = await logic.retrieveUserInfo();
        setUsername(user.username);
    };

    console.log(gameInfo);

    return (
        <Fragment>
            <div>
                <div className="header">
                    {gameInfo ? (
                        <h2 className="header__title">{gameInfo.game_title}</h2>
                    ) : (
                        <h2 className="header__title">GAME PROFILE</h2>
                    )}
                </div>
                {gameInfo && (
                    <Fragment>
                        {logic.isUserLoggedIn &&
                            gameInfo &&
                            preScore &&
                            (gameInfo.reviews.some(
                                review =>
                                    review.author !== null &&
                                    review.author.username === username
                            ) ? (
                                ""
                            ) : (
                                <h3 className="preScore">{preScore}</h3>
                            ))}
                        <div className="game-profile">
                            {gameInfo.boxartUrl ? (
                                <img
                                    className="game-profile__image"
                                    src={`${gameCover}${gameInfo.boxartUrl}`}
                                    alt={gameInfo.game_title}
                                />
                            ) : (
                                <img
                                    src={NOT_FOUND_IMAGE_URL}
                                    alt={gameInfo.game_title}
                                />
                            )}
                            <div className="game-profile__details">
                                {gameInfo.finalScore ? (
                                    <h2 className="game-profile__details__finalScore">
                                        {Math.round(gameInfo.finalScore * 20)}
                                    </h2>
                                ) : (
                                    <h2 className="game-profile__details__notRated">
                                        Not rated yet, be the first!
                                    </h2>
                                )}
                                <p>
                                    Platform :{" "}
                                    <span className="game-profile__details--detail">
                                        {gameInfo.platformName.join(", ")}
                                    </span>
                                </p>
                                {gameInfo.genreNames[0] !== "N/A" && (
                                    <p>
                                        Genres :{" "}
                                        <span className="game-profile__details--detail">
                                            {gameInfo.genreNames.join(", ")}
                                        </span>
                                    </p>
                                )}
                                {gameInfo.developerNames[0] !== "N/A" && (
                                    <p>
                                        Developers :{" "}
                                        <span className="game-profile__details--detail">
                                            {gameInfo.developerNames.join(", ")}
                                        </span>
                                    </p>
                                )}
                                {gameInfo.publisherNames[0] !== "N/A" && (
                                    <p>
                                        Publishers :{" "}
                                        <span className="game-profile__details--detail">
                                            {gameInfo.publisherNames.join(", ")}
                                        </span>
                                    </p>
                                )}
                                {gameInfo.players !== null && (
                                    <p>
                                        Players :{" "}
                                        <span className="game-profile__details--detail">
                                            {gameInfo.players}
                                        </span>
                                    </p>
                                )}
                                <p>
                                    Coop :{" "}
                                    <span className="game-profile__details--detail">
                                        {gameInfo.coop}
                                    </span>
                                </p>
                            </div>

                            <p className="game-profile__overview">
                                {gameInfo.overview}
                            </p>
                        </div>
                        <div>
                            {logic.isUserLoggedIn ? (
                                gameInfo.reviews.some(
                                    review =>
                                        review.author !== null &&
                                        review.author.username === username
                                ) ? (
                                    <div />
                                ) : (
                                    <div>
                                        <h2 className="header header__title">
                                            Write Review
                                        </h2>
                                        <WriteReview
                                            gameInfo={gameInfo}
                                            refresh={retrieveGameInfo}
                                            gameId={gameId}
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="login-to-comment">
                                    <Link to="/login">
                                        Login to write a comment
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            {gameInfo.reviews && !!gameInfo.reviews.length && (
                                <div>
                                    <h2 className="header header__title">
                                        REVIEWS
                                    </h2>

                                    {gameInfo.reviews
                                        // .reverse()
                                        .map((review, index) => (
                                            <Review
                                                index={index + 1}
                                                key={review._id}
                                                review={review}
                                                printFrom={"gameProfile"}
                                            />
                                        ))}
                                </div>
                            )}
                        </div>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default GameProfile;
