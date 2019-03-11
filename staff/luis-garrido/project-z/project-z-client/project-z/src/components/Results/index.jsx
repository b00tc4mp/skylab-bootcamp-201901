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

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">RESULTS</h1>
                </div>
                <div className="results">
                    {results &&
                        results.map(game => {
                            return <Card key={game.id} game={game} />;
                        })}
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Results);
