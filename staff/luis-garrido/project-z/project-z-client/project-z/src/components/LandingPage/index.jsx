import React, { Fragment, useState, useEffect } from "react";
import logic from "../../logic";

import Card from '../Card'

const LandingPage = props => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        getRanking();
    }, []);

    const getRanking = async () => setRanking(await logic.retrieveBestScored());

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">LANDING PAGE</h1>
                </div>
                <div className="results">
                    
                        {ranking &&
                            ranking.map(game => {
                                return <Card key={game.id} game={game} />;
                            })}
                    
                </div>
            </div>
        </Fragment>
    );
};

export default LandingPage;
