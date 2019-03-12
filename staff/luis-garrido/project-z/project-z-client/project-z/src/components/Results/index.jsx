import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Masonry from "react-masonry-component";
import "./index.sass";

import logic from "../../logic";

import Card from "../Card";

const Results = props => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        searchGames(props.match.params.query);
    }, [props.match.params.query]);

    const searchGames = async query =>
        setResults(await logic.searchGames(query));

    const masonryOptions = {
        transitionDuration: 0,
        gutter: 20
    };

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">RESULTS</h1>
                </div>
                <Masonry
                    className={"results content"}
                    elementType={"section"}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                >
                    {/* <div className="results"> */}
                    {results &&
                        results.map(game => {
                            return <Card game={game} key={game.id} />;
                        })}
                    {/* </div> */}
                </Masonry>
            </div>
        </Fragment>
    );
};

export default withRouter(Results);
