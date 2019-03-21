import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Masonry from "react-masonry-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.sass";

import logic from "../../logic";

import Card from "../Card";

const Results = ({ match, history }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        searchGames(match.params.query);
    }, [match.params.query]);

    const searchGames = async query => {
        try {
            logic
                .searchGames(query)
                .then(res => setResults(res))
                .catch(error => {
                    history.push("/noresults");
                });
        } catch (error) {
            notify(error.message);
        }
    };

    const notify = message => {
        toast.dismiss();
        toast.error(message);
    };

    const masonryOptions = {
        transitionDuration: 0,
        gutter: 1,
        columnWidth: ".card"
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
                    {results &&
                        results.map(game => {
                            return <Card game={game} key={game.id} />;
                        })}
                </Masonry>
            </div>
        </Fragment>
    );
};

export default withRouter(Results);
