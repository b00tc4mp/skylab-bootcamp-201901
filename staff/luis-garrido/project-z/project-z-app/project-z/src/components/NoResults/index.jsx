import React, { Fragment, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const NoResults = ({
    match: {
        params: { username: _username }
    }
}) => {
    const [adorableAvatar, setAdorableAvatar] = useState("");

    useEffect(() => {
        setAdorableAvatar(
            `https://api.adorable.io/avatars/285/${Math.random() * 1000}.png`
        );
    }, [_username]);

    return (
        <Fragment>
            <div className="review-page">
                <div className="header">
                    <h2 className="header__title">{"NO RESULTS"}</h2>
                </div>
                <div className="user-profile">
                    <div className="user-profile__info">
                        <img
                            className="avatar-profile"
                            src={adorableAvatar}
                            alt="default avatar"
                        />
                        <h2>{"NO RESULTS ON THAT SEARCH"}</h2>
                        <p>
                            You may want to try luck with a{" "}
                            <Link to="/random">RANDOM GAME</Link>!
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(NoResults);
