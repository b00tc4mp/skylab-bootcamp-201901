import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logic from "../../logic";

import RankingCard from "../RankingCard";

const TopLanding = () => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        getRanking();
    }, []);

    const getRanking = async () =>
        setRanking(await logic.retrieveBestScored("5"));

    return (
        <Fragment>
            <div className="top-landing">
                <div className="header">
                    <h2 className="header__title">Top 5</h2>
                </div>
                <div className="top-landing__results">
                    {ranking &&
                        ranking.map((game, index) => {
                            return (
                                <RankingCard
                                    index={index + 1}
                                    key={game.id}
                                    game={game}
                                />
                            );
                        })}
                </div>
            </div>
            <div className="top-landing__link">
                <Link to={`/ranking`}>Go to full ranking</Link>
            </div>
        </Fragment>
    );
};

export default TopLanding;
