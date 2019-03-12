import React, { Fragment, useState, useEffect } from "react";
import Masonry from "react-masonry-component";

import logic from "../../logic";

import Card from "../Card";

const LandingPage = props => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        getRanking();
    }, []);

    const getRanking = async () => setRanking(await logic.retrieveBestScored());

    const masonryOptions = {
        transitionDuration: 0,
        gutter: 20
    };

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">LANDING PAGE</h1>
                </div>
                <Masonry
                    className={"results content"}
                    elementType={"section"}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                >
                    {/* <div className="results"> */}

                    {ranking &&
                        ranking.map(game => {
                            return <Card key={game.id} game={game} />;
                        })}

                    {/* </div> */}
                </Masonry>
            </div>
        </Fragment>
    );
};

export default LandingPage;
