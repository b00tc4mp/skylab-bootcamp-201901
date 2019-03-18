import React, { Fragment, useState, useEffect } from "react";

import logic from "../../logic";

import RankingCard from "../RankingCard";

const TopFifty = props => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        getRanking();
    }, []);

    const getRanking = async () => setRanking(await logic.retrieveBestScored('50'));

    console.log(ranking);
    return (
        <Fragment>
            <div className="top-landing">
                <div className="header">
                    <h2 className="header__title">Top 50</h2>
                </div>
                <div className="top-landing__results">
                    {ranking &&
                        ranking.map((game,index) => {
                            return <RankingCard index={index+1} key={game.id} game={game} />;
                        })}
                </div>
            </div>
        </Fragment>
    );
};

export default TopFifty;
