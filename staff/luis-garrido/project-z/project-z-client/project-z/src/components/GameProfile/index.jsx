import React, { Fragment, useState, useEffect } from "react";
import logic from "../../logic";

const { REACT_APP_THUMB: gameCover } = process.env;

const GameProfile = props => {
    const [gameInfo, setGameInfo] = useState([]);

    useEffect(() => {
        retrieveGameInfo(props.match.params.gameId);
    }, [props.match.params.gameId]);

    const retrieveGameInfo = async gameId =>
        setGameInfo(await logic.retrieveGameInfo(gameId));

    console.log(gameInfo);

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">GAME PROFILE</h1>
                </div>
                <div className="results">
                    <img
                        src={`${gameCover}${gameInfo.boxartUrl}`}
                        alt={gameInfo.game_title}
                    />
                    <h2>{gameInfo.game_title}</h2>
                    <p>{gameInfo.overview}</p>
                    <h2>{gameInfo.finalScore}</h2>
                </div>
                {/* {logic.isUserLoggedIn && <Review />} */}
            </div>
        </Fragment>
    );
};

export default GameProfile;
