import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Masonry from "react-masonry-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.sass";

import logic from "../../logic";

import Card from "../Card";

const Results = props => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        searchGames(props.match.params.query);
    }, [props.match.params.query]);

    const searchGames = async query => {
        try {
            logic
                .searchGames(query)
                .then(res => setResults(res))
                .catch(({ message }) => {
                    // notify("No results found!")
                    props.history.push('/noresults')
                });
        } catch (error) {
            notify(error.message);
        }
    };

    const notify = message => {
        toast.dismiss()
        toast.error(message)
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
